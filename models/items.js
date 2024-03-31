const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ItemSchema = new schema({
  mentorId: {
    type: String,
    required: true
  },
  subjectId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  mentorName: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 10000
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  gpa: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  certificate: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Waiting for Approval'
  }
});

module.exports = item = mongoose.model('item', ItemSchema);
