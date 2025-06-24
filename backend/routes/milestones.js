const express = require('express');
const Milestone = require('../models/Milestone');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all milestones for user
router.get('/', auth, async (req, res) => {
  try {
    const milestones = await Milestone.find({ userId: req.userId }).sort({ date: -1 });
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add milestone
router.post('/', auth, async (req, res) => {
  try {
    const { title, date, note } = req.body;
    const milestone = new Milestone({
      userId: req.userId,
      title,
      date,
      note,
    });
    await milestone.save();
    res.status(201).json(milestone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update milestone
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, date, note } = req.body;
    const milestone = await Milestone.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, date, note },
      { new: true }
    );
    
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    
    res.json(milestone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete milestone
router.delete('/:id', auth, async (req, res) => {
  try {
    const milestone = await Milestone.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    
    res.json({ message: 'Milestone deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tips for a milestone
router.get('/:id/tips', auth, async (req, res) => {
  try {
    const Tip = require('../models/Tip');
    const tips = await Tip.find({ milestoneId: req.params.id })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(tips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add tip to milestone
router.post('/:id/tips', auth, async (req, res) => {
  try {
    const Tip = require('../models/Tip');
    const { content } = req.body;
    
    const tip = new Tip({
      milestoneId: req.params.id,
      userId: req.userId,
      content,
    });
    
    await tip.save();
    await tip.populate('userId', 'name');
    res.status(201).json(tip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;