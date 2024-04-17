const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const auth = require('../../middleware/auth');
const User = require('../../models/user');

const cors = require('cors');

const app = express();

app.use(cors());

// @route    GET api/auth
// @desc     Register new user
// @access   Public
router.get('/', function (req, res) {
  res.send('register');
});

// @route    POST api/auth/authuser
// @desc     Authenticate user
// @access   Public
router.post('/authuser', function (req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: 'Please Enter All' });
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'Doesnt exist' });
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid Creds' });
      jwt.sign(
        { id: user.id },
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

// @route    GET api/auth/users
// @desc     Get all users
// @access   Public
router.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    if (err)
      return res.status(500).send('There was a problem finding the users.');
    res.status(200).send(users);
  });
});

// @route    DELETE api/auth
// @desc     Delete user
// @access   Private
router.delete('/:id', auth, function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err)
      return res.status(500).send('There was a problem deleting the user.');
    res.status(200).send('User: ' + user.name + ' was deleted.');
  });
});

// @route    PUT api/auth
// @desc     Update user
// @access   Private
router.put('/:id', auth, function (req, res) {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function (err, user) {
      if (err)
        return res.status(500).send('There was a problem updating the user.');
      res.status(200).send(user);
    }
  );
});

// @route    GET api/auth/user
// @desc     Get user data
// @access   Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});

module.exports = router;
