// fileController.js
const csv = require('csv-parser');
const fs = require('fs');
const Contact = require('../models/Contact');

exports.uploadContacts = async (req, res) => {
  const file = req.file;  // Assuming multer is used for file uploads
  const results = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      // Validate and insert contacts
      for (const contactData of results) {
        const { name, email, phone, address, timezone } = contactData;

        // Validation can be added here or reuse validation logic
        await Contact.create({ name, email, phone, address, timezone, userId: req.user });
      }

      res.status(201).json({ message: 'Contacts uploaded successfully' });
    });
};
