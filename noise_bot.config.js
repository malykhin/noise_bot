module.exports = {
  apps: [
    {
      name: 'noise_bot',
      script: './src/index.js',
      env: {
        VID: 1155,
        PID: 22352,

        SYNC_INTERVAL: 1000,
        SCAN_BUFFER_SIZE: 5,
        MAX_AVG_NOISE: 60,
        TIMEOUT: 10000,

        SENDER_EMAIL: '',
        SENDER_PASSWORD: '',

        CHAT_EMAILS: '',
        GET_IP_COMMAND: 'hostname -I',
        EXTERNAL_VALUE_STORAGE_URL: 'http://10.8.0.1',
      },
    },
  ],
}
