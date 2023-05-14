const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password'
  }
});

function sendEmail(supplierEmail, materialName, demandDate) {
  const mailOptions = {
    from: 'your_email@gmail.com',
    to: supplierEmail,
    subject: 'Material Order Reminder',
    text: `Dear Supplier,\n\nWe would like to remind you that we have a demand for ${materialName} coming up on ${demandDate}. Please make sure that you have the necessary stock available.\n\nThank you,\nThe Plant Operations Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { sendEmail };
