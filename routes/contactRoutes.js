// contactRoutes.js
const express = require('express');
const { addContact, getContacts, updateContact, deleteContact } = require('./contactController');
const { protect } = require('../auth/authMiddleware');

const router = express.Router();

router.post('/', protect, addContact);
router.get('/', protect, getContacts);
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);

module.exports = router;
