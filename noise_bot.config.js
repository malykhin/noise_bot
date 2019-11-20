module.exports = {
  apps: [
    {
      name: 'noise_bot',
      script: './src/index.js',
      env: {
        VID: 1155,
        PID: 22352,

        SYNC_INTERVAL: 1000,
        SCAN_BUFFER_SIZE: 3,
        MAX_AVG_NOISE: 60,

        SLACK_BOT_TOKEN: '',
        SLACK_CHANNEL: 'noise_test',
      },
    },
  ],
}
