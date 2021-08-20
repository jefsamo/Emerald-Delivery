const nodemailer = require('nodemailer');

const templateMsg = () => {
  return {
    to: newUser.email, // Change to your recipient
    from: process.env.EMAIL_FROM, // Change to your verified sender
    subject: 'Welcome to the family',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<a href="medium.com">Check this link out</li>',
  };
};

module.exports = templateMsg;
