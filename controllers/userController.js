const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utility/catchAsync');

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
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
