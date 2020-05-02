const mongoose = require('mongoose');
const slugify = require('slugify');

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
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
  },
});

// Create Top Five from slug
TopFiveSchema.pre('save', function () {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('TopFiveSchema', TopFiveSchema);
