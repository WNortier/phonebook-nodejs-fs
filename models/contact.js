//@ts-nocheck
var contactList = [];

module.exports = class Contact {
  constructor(name, email, number, address) {
    this.id = this.generateId();
    this.name = name;
    this.email = email;
    this.number = number;
    this.address = address;
  }

  generateId() {
    return Math.ceil(Math.random() * 1000000);
  }

  save() {
    contactList.push(this);
    return contactList;
  }

  static deleteContacts() {
    contactList.length = 0;
  }

  static deleteContact(index) {
    let contacts = [...contactList];
    contacts.splice(index, 1);
    contactList = contacts;
  }

  static getContacts() {
    return contactList;
  }
};
