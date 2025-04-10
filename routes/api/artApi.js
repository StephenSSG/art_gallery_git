const express = require('express');
const router = express.Router();
const axios = require('axios');

// Fetch artwork list
router.get('/artworks', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.ART_API_BASE}/artworks?limit=20`);
    const artworks = response.data.data.map(art => ({
      id: art.id,
      title: art.title,
      artist: art.artist_display,
      image_id: art.image_id,
      iiif_url: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
    }));
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artworks' });
  }
});

// Fetch single artwork details
router.get('/artworks/:id', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.ART_API_BASE}/artworks/${req.params.id}`);
    const art = response.data.data;
    res.json({
      title: art.title,
      description: art.description || 'No description available',
      image_url: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artwork details' });
  }
});

module.exports = router;