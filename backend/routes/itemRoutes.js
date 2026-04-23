const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { protect } = require('../middleware/authMiddleware');

// GET /api/items/search?name=xyz
router.get('/search', protect, async (req, res) => {
  const { name, type } = req.query;
  try {
    let query = {};
    if (name) {
      query.itemName = { $regex: name, $options: 'i' };
    }
    if (type) {
      query.type = type;
    }
    const items = await Item.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/items
router.get('/', protect, async (req, res) => {
  try {
    const items = await Item.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/items/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/items
router.post('/', protect, async (req, res) => {
  const { itemName, description, type, location, date, contactInfo } = req.body;
  try {
    const item = new Item({
      itemName,
      description,
      type,
      location,
      date,
      contactInfo,
      user: req.user.id
    });
    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/items/:id
router.put('/:id', protect, async (req, res) => {
  const { itemName, description, type, location, date, contactInfo } = req.body;
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      // Check user authorization if needed. We'll let any authenticated user edit for now or just the creator.
      // Requirements don't specify, but usually you only edit your own items. Let's restrict to owner.
      if (item.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to edit this item' });
      }

      item.itemName = itemName || item.itemName;
      item.description = description || item.description;
      item.type = type || item.type;
      item.location = location || item.location;
      item.date = date || item.date;
      item.contactInfo = contactInfo || item.contactInfo;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/items/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      if (item.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to delete this item' });
      }
      await item.deleteOne();
      res.json({ message: 'Item removed' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
