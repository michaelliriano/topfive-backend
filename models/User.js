const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please add your first name.'],
  },
  last_name: {
    type: String,
    required: [true, 'Please add your first name.'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: [true, 'That email already exists'],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please add a valid email'],
  },
  username: {
    type: String,
    required: true,
    unique: [true, 'That username already exists.'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password.'],
    minlength: 6,
    select: false,
  },
  photo: {
    type: String,
  },
  bio: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
});

// Encrypt Password using bcrypt

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and has password token

UserSchema.methods.getResetPasswordToken = function () {
  // Gen token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // hash token and set to resetpasswordtoken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
