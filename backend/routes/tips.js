const express = require('express');
const Tip = require('../models/Tip');
const auth = require('../middleware/auth');

const router = express.Router();

// Like/unlike a tip
router.put('/:id/like', auth, async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);
    
    if (!tip) {
      return res.status(404).json({ error: 'Tip not found' });
    }
    
    const likeIndex = tip.likes.indexOf(req.userId);
    
    if (likeIndex > -1) {
      // Unlike
      tip.likes.splice(likeIndex, 1);
    } else {
      // Like
      tip.likes.push(req.userId);
    }
    
    await tip.save();
    await tip.populate('userId', 'name');
    res.json(tip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;