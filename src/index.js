require('dotenv').config()

const HID = require('node-hid')
const Slack = require('slack')
const { sum } = require('lodash')

const logger = require('./logger')
const dailyRotateLog = require('./dailyRotateLog')

const { VID, PID, TOKEN, SLACK_CHANNEL, SYNC_INTERVAL, SCAN_BUFFER_SIZE, MAX_AVG_NOISE } = require('./config')

const slack = new Slack({ token: TOKEN })

const SYNC_PACKET = [0xb3].concat(Array(63).fill(0x00))

const device = new HID.HID(VID, PID)

setInterval(() => device.write(SYNC_PACKET), SYNC_INTERVAL)

let scanBuffer = Array(+SCAN_BUFFER_SIZE).fill(0)

device.on('data', (data) => {
  const value = data.readInt16BE(0) / 10

  const message = { value, timestamp: Date.now() }
  dailyRotateLog.info(message)

  scanBuffer.shift()
  scanBuffer.push(value)

  const avgNoise = sum(scanBuffer) / scanBuffer.length

  logger('avgNoise', avgNoise)

  if (avgNoise > +MAX_AVG_NOISE) {
    scanBuffer = Array(+SCAN_BUFFER_SIZE).fill(0)
    slack.chat.postMessage({ token: TOKEN, channel: SLACK_CHANNEL, text: 'QUIET!' }).then(logger)
  }
})

device.on('error', logger)

process.on('unhandledRejection', logger)
