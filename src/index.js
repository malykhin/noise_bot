require('dotenv').config()

const HID = require('node-hid')
const { sum } = require('lodash')
const { execSync } = require('child_process')

const logger = require('./logger')
const { sendLoudMail, sendAddressEmail } = require('./sendMail')
const dailyRotateLog = require('./dailyRotateLog')
const { saveValue } = require('./externalValueStorage')
const { VID, PID, SYNC_INTERVAL, SCAN_BUFFER_SIZE, MAX_AVG_NOISE, TIMEOUT, GET_IP_COMMAND } = require('./config')

const currentIp = execSync(GET_IP_COMMAND, { encoding: 'utf-8' })

sendAddressEmail(currentIp)
  .then((data) => logger(data))
  .catch((error) => logger(error))

const SYNC_PACKET = [0xb3].concat(Array(63).fill(0x00))

const device = new HID.HID(VID, PID)

const createReadInterval = () => setInterval(() => device.write(SYNC_PACKET), SYNC_INTERVAL)

let readInterval = createReadInterval()

let scanBuffer = Array(+SCAN_BUFFER_SIZE).fill(0)

device.on('data', (data) => {
  const value = data.readInt16BE(0) / 10

  saveValue(value)
    .then((data) => logger(data))
    .catch((error) => logger(error))

  const message = { value, timestamp: Date.now() }
  dailyRotateLog.info(message)

  scanBuffer.shift()
  scanBuffer.push(value)

  const avgNoise = sum(scanBuffer) / scanBuffer.length

  logger('avgNoise', avgNoise)

  if (avgNoise > +MAX_AVG_NOISE) {
    scanBuffer = Array(+SCAN_BUFFER_SIZE).fill(0)
    sendLoudMail()
      .then((data) => logger(data))
      .catch((error) => logger(error))
      .finally(() => {
        clearInterval(readInterval)
        setTimeout(() => {
          readInterval = createReadInterval()
        }, +TIMEOUT)
      })
  }
})

device.on('error', logger)

process.on('unhandledRejection', logger)
