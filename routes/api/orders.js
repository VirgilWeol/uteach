const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Order = require('../../models/orders');
const Item = require('../../models/items');
const cors = require('cors');
const calculateAverageRating = require('../../middleware/calculateRating');

const app = express();

app.use(cors());

// @route    GET api/orders
// @desc     Get All Orders
// @access   Public
router.get('/', function (req, res) {
  Order.find()
    .sort({ date: -1 })
    .then((orders) => res.json(orders));
});

// @route    GET api/orders/:id
// @desc     Get An Order
// @access   Public
router.get('/:_id', function (req, res) {
  Order.findById(req.params._id)
    .then((order) => res.json(order))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route    GET api/orders/mentor/:mentorId
// @desc     Get Orders By Mentor
// @access   Public
router.get('/mentor/:mentorId', function (req, res) {
  Order.find({ mentorId: req.params.mentorId })
    .sort({ date: -1 })
    .then((orders) => res.json(orders));
});

// @route    GET api/orders/student/:studentId
// @desc     Get Orders By Student
// @access   Public
router.get('/student/:studentId', function (req, res) {
  Order.find({ studentId: req.params.studentId })
    .sort({ date: -1 })
    .then((orders) => res.json(orders));
});

// @route    GET api/orders/subject/:subjectId
// @desc     Get Orders By Subject
// @access   Public
router.get('/subject/:subjectId', function (req, res) {
  Order.find({ subjectId: req.params.subjectId })
    .sort({ date: -1 })
    .then((orders) => res.json(orders));
});

// @route    PUT api/orders/:id
// @desc     Update An Order
// @access   Private
router.put('/:_id', auth, async function (req, res) {
  try {
    const order = await Order.findById(req.params._id);

    if (req.body.rating) {
      const mentorId = order.mentorId;

      // Fetch orders related to the mentor
      const orders = await Order.find({ mentorId: mentorId });

      if (orders.length === 0) {
        return null;
      }

      const totalRating = orders.reduce(
        (sum, order) => sum + (order.rating || 0),
        0
      );
      const newAverageRating = totalRating / orders.length;

      const updatedItem = await Item.findOneAndUpdate(
        { mentorId: mentorId },
        { rating: newAverageRating },
        { new: true }
      );

      console.log('newAverageRating', newAverageRating);
      res.json({ success: true, rating: newAverageRating });
    } else {
      for (const field in req.body) {
        order[field] = req.body[field];
      }

      order
        .save()
        .then((updatedOrder) => res.json(updatedOrder))
        .catch((err) => res.status(400).json({ success: false, error: err }));
    }
  } catch (err) {
    console.error('Error updating order or item:', err);
    res.status(500).json({ success: false, error: 'Error updating rating' });
  }
});

// @route    POST api/orders
// @desc     Create An Order
// @access   Private
router.post('/', auth, function (req, res) {
  var newOrder = new Order({
    itemId: req.body.itemId,
    studentId: req.body.studentId,
    mentorId: req.body.mentorId,
    studentName: req.body.studentName,
    subject: req.body.subject,
    price: req.body.price,
    contract: req.body.contract,
    description: req.body.description,
    status: 'Offer sent to mentor'
  });
  newOrder.save().then((order) => res.json(order));
});

// @route    DELETE api/orders/:id
// @desc     Delete An Order
// @access   Private
router.delete('/:_id', auth, function (req, res) {
  Order.findById(req.params._id)
    .then((order) => order.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
