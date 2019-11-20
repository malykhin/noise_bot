const winston = require('winston')
const path = require('path')
require('winston-daily-rotate-file')

const logger = require('./logger')

const transport = new winston.transports.DailyRotateFile({
  frequency: '1d',
  dirname: path.join(__dirname, '../log'),
  filename: 'noise-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '2d',
})

transport.on('rotate', (oldFilename, newFilename) => {
  logger(oldFilename, newFilename)
})

module.exports = winston.createLogger({
  transports: [transport],
})
