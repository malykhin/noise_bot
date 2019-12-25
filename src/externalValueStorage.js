const request = require('request-promise-native')

const { EXTERNAL_VALUE_STORAGE_URL } = require('./config')

const saveValue = (value) =>
  request({
    method: 'POST',
    uri: `${EXTERNAL_VALUE_STORAGE_URL}/meter`,
    body: {
      value,
    },
    json: true,
  })

module.exports = { saveValue }
