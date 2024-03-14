const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Item = require('../../models/items');
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

// @route    POST api/items
// @desc     Create An Item
// @access   Private
router.post('/', auth, function (req, res) {
  var newItem = new Item({
    mentorId: req.body.mentorId,
    subjectId: req.body.subjectId,
    mentorName: req.body.mentorName,
    subject: req.body.subject,
    price: req.body.price,
    rating: req.body.rating,
    description: req.body.description,
    phone: req.body.phone,
    age: req.body.age,
    address: req.body.address
  });
  newItem.save().then((item) => res.json(item));
});

// @route    DELETE api/items/:id
// @desc     Delete An Item
// @access   Private
router.delete('/:_id', auth, function (req, res) {
  Item.findById(req.params._id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
