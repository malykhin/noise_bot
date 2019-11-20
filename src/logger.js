const winston = require('winston')

const { isPlainObject, isArray } = require('lodash')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [new winston.transports.Console({ format: winston.format.simple() })],
})

const info = (...args) =>
  logger.info(
    args.reduce((acc, item) => {
      if (isPlainObject(item) || isArray(item)) {
        return `${acc} ${JSON.stringify(item)}`
      }
      return `${acc} ${item}`
    }, ''),
  )

module.exports = info
