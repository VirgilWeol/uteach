const mongoose = require('mongoose');
const schema = mongoose.Schema;

const SubjectSchema = new schema({
  date: {
    type: Date,
    default: Date.now
  },
  subjectName: {
    type: String,
    required: true
  },
  mentors: {
    type: Number,
    required: true
  },
  students: {
    type: Number,
    required: true
  },
  minPrice: {
    type: Number,
    required: true
  }
});

module.exports = subject = mongoose.model('subject', SubjectSchema);
