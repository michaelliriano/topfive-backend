const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

exports.register = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, email, username, password } = req.body;

  // Create usr

  const user = await User.create({
    first_name,
    last_name,
    email,
    username,
    password,
  });

  res.status(200).json({ success: true });
});
