//@ts-nocheck
const express = require('express');
const router = express.Router();

const {
  deleteContacts,
  getContacts,
  deleteContact,
} = require('../models/contact');
const Contact = require('../models/contact');

router.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About',
    aboutCSS: true,
    contactCSS: false,
    addCSS: false,
  });
});

router.get('/', (req, res) => {
  res.status(200).render('add', {
    pageTitle: 'Add Contact',
    addCSS: true,
    contactCSS: false,
    aboutCSS: false,
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
  res.status(201).render('add', {
    pageTitle: 'Add Contact',
    addCSS: true,
    contactCSS: false,
    aboutCSS: false,
    count: getContacts().length,
  });
});

router.get('/edit-product/:id', (req, res) => {
  const { id } = req.params;
  const { edit } = JSON.parse(req.query.edit);
  const contacts = getContacts();
  const index = contacts.findIndex((c) => {
    return c.id == id;
  });
  const contact = contacts[index]

  console.log(edit)

  res.status(201).render('add', {
    pageTitle: 'Add Contact',
    addCSS: true,
    contactCSS: false,
    aboutCSS: false,
    count: getContacts().length,
    contact: contact,
    edit: edit
  });
});


router.post('/delete-all', (req, res) => {
  deleteContacts();
  res.status(201).redirect('/');
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
      aboutCSS: false,
      contacts: getContacts(),
    });
  } else {
    res.status(404).json({ message: `Record ${id} was not found` });
  }
});

router.get('/contacts', (req, res) => {
  res.render('contacts', {
    pageTitle: 'Contacts',
    contactCSS: true,
    addCSS: false,
    aboutCSS: false,
    contacts: getContacts(),
  });
});

module.exports = router;
