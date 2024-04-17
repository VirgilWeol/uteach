const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Item = require('../../models/items');
const Subject = require('../../models/subjects');
const cors = require('cors');

const app = express();

app.use(cors());

// @route    GET api/items
// @desc     Get All Items
// @access   Public
router.get('/', function (req, res) {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route    GET api/items/:id
// @desc     Get An Item
// @access   Public
router.get('/:_id', function (req, res) {
  Item.findById(req.params._id)
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route    GET api/items/subject/:subject
// @desc     Get An Item by subject name
// @access   Public
router.get('/subject/:subject', function (req, res) {
  const subjectName = req.params.subject.replace(/%20/g, ' ');

  Item.find({ subject: subjectName })
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route    GET api/items/mentor/:mentorId
// @desc     Get An Item by mentorId
// @access   Public
router.get('/mentor/:mentorId', function (req, res) {
  Item.find({ mentorId: req.params.mentorId })
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

// update item
// @route    PUT api/items/:id
// @desc     Update An Item
// @access   Private
router.put('/:_id', auth, function (req, res) {
  Item.findByIdAndUpdate(
    req.params._id,
    req.body,
    { new: true },
    function (err, item) {
      if (err)
        return res.status(500).send('There was a problem updating the item.');
      res.status(200).send(item);
    }
  );
});

// @route    PUT api/items/status/:id
// @desc     Update An Item status
// @access   Private
router.put('/status/:_id', auth, function (req, res) {
  Item.findByIdAndUpdate(
    req.params._id,
    { status: req.body.status },
    function (err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, message: 'Failed to update item' });
      }
    }
  );

  // find item by id and get mentorId
  Item.findById(req.params._id).then((item) => {
    // set user._id that match mentorId isMentor to true
    User.findByIdAndUpdate(
      { _id: item.mentorId },
      { role: 'mentor' },
      function (err, result) {
        if (err) {
          result
            .status(404)
            .json({ success: false, message: 'Failed to update user' });
        }
      }
    );
  });
});

// @route    POST api/items
// @desc     Create An Item
// @access   Private
router.post('/', auth, function (req, res) {
  var newItem = new Item({
    mentorId: req.body.mentorId,
    subjectId: req.body.subjectId,
    mentorName: req.body.mentorName,
    subject: req.body.subject,
    description: req.body.description,
    phone: req.body.phone,
    age: req.body.age,
    address: req.body.address,
    gpa: req.body.gpa,
    skills: req.body.skills,
    certificate: req.body.certificate,
    status: 'Waiting for Approval'
  });

  // find subject by subjectName and increment mentors
  Subject.findOneAndUpdate(
    { subjectName: req.body.subject },
    { $inc: { mentors: 1 } },
    function (err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, message: 'Failed to update subject' });
      }
    }
  );

  newItem.save().then((item) => res.json(item));
});

// @route    DELETE api/items/:id
// @desc     Delete An Item
// @access   Private
router.delete('/:_id', auth, function (req, res) {
  // find subject by subjectName and decrement mentors
  Item.findById(req.params._id).then((item) => {
    Subject.findOneAndUpdate(
      { subjectName: item.subject },
      { $inc: { mentors: -1 } },
      function (err, result) {
        if (err) {
          res
            .status(404)
            .json({ success: false, message: 'Failed to update subject' });
        }
      }
    );
  });

  Item.findById(req.params._id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
