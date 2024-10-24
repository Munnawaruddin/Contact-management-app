// contactController.js
const Contact = require('../models/Contact');
const { DateTime } = require('luxon');  // For timezone handling

// Add new contact
exports.addContact = async (req, res) => {
  const { name, email, phone, address, timezone } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phone,
    address,
    timezone,
    userId: req.user,  // assuming contacts are linked to the authenticated user
    createdAt: DateTime.utc().toISO(),
  });

  res.status(201).json(contact);
};

// Retrieve contacts with filtering and sorting
exports.getContacts = async (req, res) => {
  const { name, email, timezone } = req.query;

  const filters = {};
  if (name) filters.name = name;
  if (email) filters.email = email;
  if (timezone) filters.timezone = timezone;

  const contacts = await Contact.findAll({ where: filters, order: [['createdAt', 'DESC']] });
  res.json(contacts);
};

// Update contact
exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findOne({ where: { id, userId: req.user } });
  if (!contact) return res.status(404).json({ message: 'Contact not found' });

  const { name, email, phone, address, timezone } = req.body;
  await contact.update({ name, email, phone, address, timezone });

  res.json(contact);
};

// Soft delete contact
exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findOne({ where: { id, userId: req.user } });
  if (!contact) return res.status(404).json({ message: 'Contact not found' });

  await contact.update({ isDeleted: true });
  res.status(204).send();
};
