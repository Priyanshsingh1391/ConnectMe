import nodemailer from 'nodemailer'

//create a transporter objects using SMTP settings (code copied from nodemailer website)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMPTP_PASS,
  },
});

const sendEmail = async({to, subject, body}) => {
    const response = await transporter.sendEmail({
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        html: body
    })
    return response
}

export default sendEmail