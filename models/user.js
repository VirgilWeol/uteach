const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: false,
    default: 'I am a student'
  },
  role: {
    type: String,
    required: true,
    default: 'student'
  },
  address: {
    type: String,
    required: false
  }
});

module.exports = User = mongoose.model('user', UserSchema);
