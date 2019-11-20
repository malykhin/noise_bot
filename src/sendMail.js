const nodemailer = require('nodemailer')

const { SENDER_EMAIL, SENDER_PASSWORD, CHAT_EMAILS } = require('./config')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
})

const mailOptions = {
  from: SENDER_EMAIL,
  to: CHAT_EMAILS.split(','),
  subject: "It's so loud in here",
  html: '<b>Quiet please!</b>',
}

const sendMail = () =>
  new Promise((resolve, reject) =>
    transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        return reject(error)
      }
      resolve(data)
    }),
  )

module.exports = sendMail
