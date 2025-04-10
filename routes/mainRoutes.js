const express = require('express');
const router = express.Router();
const axios = require('axios');
const SavedArt = require('../models/SavedArt');

// Homepage with 3D Gallery
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.ART_API_BASE}/artworks?limit=12`);
    const artworks = response.data.data;
    res.render('pages/home', { artworks, user: req.user });
  } catch (err) {
    res.status(500).send('Error fetching artworks');
  }
});

// Artwork Details Page
router.get('/artwork/:id', async (req, res) => {
  try {
    const artResponse = await axios.get(`${process.env.ART_API_BASE}/artworks/${req.params.id}`);
    const art = artResponse.data.data;
    const imageUrl = `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`;
    
    // Check if user saved this artwork
    let isSaved = false;
    if (req.user) {
      const savedArt = await SavedArt.findOne({ user: req.user._id, artId: req.params.id });
      isSaved = !!savedArt;
    }

    res.render('pages/artwork', { art, imageUrl, isSaved });
  } catch (err) {
    res.status(500).send('Error fetching artwork details');
  }
});

module.exports = router;