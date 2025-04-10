const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => {
  res.render('pages/login');
});

// Login Handle
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: false
}));

// Register Page
router.get('/register', (req, res) => {
  res.render('pages/register');
});

// Register Handle
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.redirect('/auth/login');
  } catch (err) {
    res.redirect('/auth/register');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.error(err);
    res.redirect('/');
  });
});

module.exports = router;