const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Email = require('../utility/Email');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const msg = {
      to: newUser.email, // Change to your recipient
      from: process.env.EMAIL_FROM, // Change to your verified sender
      subject: 'Welcome to the family',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<a href="medium.com">Check this link out</li>',
    };

    await sgMail.send(msg);

    // sgMail
    //   .send(msg)
    //   .then((response) => {
    //     console.log(response[0].statusCode);
    //     console.log(response[0].headers);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    createSendToken(newUser, 201, req, res);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete({ _id: req.params.id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
