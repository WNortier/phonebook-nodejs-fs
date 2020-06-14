//@ts-nocheck
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const {
  deleteContacts,
  getContacts,
  deleteContact,
} = require('../models/contact');

router.get('/', (req, res) => {
  res.status(200).render('add', {
    pageTitle: 'Add Contact',
    addCSS: true,
    contactCSS: false,
    count: getContacts().length,
  });
});

router.post('/add-contact', (req, res) => {
  let contact = new Contact(
    req.body.name,
    req.body.email,
    req.body.number,
    req.body.address
  );
  contact.save();
  res.render('add', {
    pageTitle: 'Add Contact',
    addCSS: true,
    contactCSS: false,
    count: getContacts().length,
  });
});

router.post('/delete-all', (req, res) => {
  deleteContacts();
  res.redirect('/');
});

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;

  let contacts = getContacts();

  const index = contacts.findIndex((c) => {
    return c.id == id;
  });
  if (index !== undefined) {
    deleteContact(index);

    res.status(201).render('contacts', {
      pageTitle: 'Contacts',
      contactCSS: true,
      addCSS: false,
      contacts: getContacts(),
    });
  } else {
    res.status(404).json({ message: `Record ${id} was not found` });
  }
});

router.get('/contacts', (req, res) => {
  // let contact = new Contact(req.body.name, req.body.email, req.body.number, req.body.address)

  res.render('contacts', {
    pageTitle: 'Contacts',
    contactCSS: true,
    addCSS: false,
    contacts: getContacts(),
  });
});

module.exports = router;
