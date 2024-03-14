const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Subject = require('../../models/subjects');
const cors = require('cors');

const app = express();

app.use(cors());

// @route    GET api/subjects
// @desc     Get All Subjects
// @access   Public
router.get('/', function (req, res) {
  Subject.find()
    .sort({ date: -1 })
    .then((subjects) => res.json(subjects));
});

// @route    GET api/subjects/:id
// @desc     Get A Subject
// @access   Public
router.get('/:_id', function (req, res) {
  Subject.findById(req.params._id)
    .then((subject) => res.json(subject))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route    POST api/subjects
// @desc     Create A Subject
// @access   Private
router.post('/', function (req, res) {
  var newSubject = new Subject({
    subjectName: req.body.subjectName,
    mentors: req.body.mentors,
    students: req.body.students,
    minPrice: req.body.minPrice
  });
  newSubject.save().then((subject) => res.json(subject));
});

// @route    DELETE api/subjects/:id
// @desc     Delete A Subject
// @access   Private
router.delete('/:_id', auth, function (req, res) {
  Subject.findById(req.params._id)
    .then((subject) => subject.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route    PUT api/subjects/:id
// @desc     Update A Subject
// @access   Private
router.put('/:_id', auth, function (req, res) {
  Subject.findByIdAndUpdate(
    req.params._id,
    req.body,
    { new: true },
    function (err, subject) {
      if (err)
        return res
          .status(500)
          .send('There was a problem updating the subject.');
      res.status(200).send(subject);
    }
  );
});

module.exports = router;
