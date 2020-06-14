//@ts-nocheck
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const { deleteContacts, getContacts } = require('../models/contact');

router.get('/', (req, res, next) => {
  res.status(200).render('add', {
    pageTitle: 'Add Contact',
    addCSS: true,
    contactCSS: false,
    count: getContacts().length
  });
});

router.post('/add-contact', (req, res, next) => {
  let contact = new Contact(req.body.name, req.body.email, req.body.number, req.body.address)
  contact.save();
  res.render('add', {
    pageTitle: 'Add Contact',
    addCSS: true,
    contactCSS: false,
    count: getContacts().length
  });
});

router.post('/delete-all', (req, res, next) => {
  deleteContacts();
  res.redirect('/')
});

router.get('/contacts', (req, res, next) => {
  // let contact = new Contact(req.body.name, req.body.email, req.body.number, req.body.address)


  res.render('contacts', {
    pageTitle: 'Contacts',
    contactCSS: true,
    addCSS: false,
    contacts: getContacts()
  });

});

module.exports = router;
