const mongoose = require('mongoose');

const savedArtSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  artId: { type: String, required: true },
  title: { type: String, required: true }
});

module.exports = mongoose.model('SavedArt', savedArtSchema);