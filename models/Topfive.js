const mongoose = require('mongoose');

const TopFiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    maxlength: [50, 'Name can not be more than 50 Characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [50, 'Name can not be more than 50 Characters'],
  },
  topItems: [
    {
      name: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
        default: 'no-photo.jpg',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TopFiveSchema', TopFiveSchema);
