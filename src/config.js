module.exports = {
  VID: process.env.VID,
  PID: process.env.PID,

  SYNC_INTERVAL: process.env.SYNC_INTERVAL,
  SCAN_BUFFER_SIZE: process.env.SCAN_BUFFER_SIZE,
  MAX_AVG_NOISE: process.env.MAX_AVG_NOISE,

  TOKEN: process.env.SLACK_BOT_TOKEN,
  SLACK_CHANNEL: process.env.SLACK_CHANNEL,
}
