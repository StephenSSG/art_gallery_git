const express = require('express');
const router = express.Router();
const SavedArt = require('../models/SavedArt');

// Middleware to check authentication
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
};

// Profile Page
router.get('/profile', ensureAuthenticated, async (req, res) => {
  try {
    const savedArts = await SavedArt.find({ user: req.user._id });
    res.render('pages/profile', { user: req.user, savedArts });
  } catch (err) {
    res.status(500).send('Error fetching profile');
  }
});

// Save Artwork
router.post('/save-art', ensureAuthenticated, async (req, res) => {
  try {
    const { artId, title } = req.body;
    const savedArt = new SavedArt({
      user: req.user._id,
      artId,
      title
    });
    await savedArt.save();
    res.redirect('back');
  } catch (err) {
    res.redirect('back');
  }
});

// Delete Saved Artwork
router.post('/unsave-art/:id', ensureAuthenticated, async (req, res) => {
  try {
    await SavedArt.findByIdAndDelete(req.params.id);
    res.redirect('back');
  } catch (err) {
    res.redirect('back');
  }
});

module.exports = router;