const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt Password using bcrypt

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
