const mongoose = require('mongoose');
const schema = mongoose.Schema;

const OrderSchema = new schema({
  date: {
    type: Date,
    default: Date.now
  },
  itemId: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  mentorId: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  contract: {
    type: Number,
    required: true
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
  status: {
    type: String,
    required: true
  }
});

module.exports = order = mongoose.model('order', OrderSchema);
