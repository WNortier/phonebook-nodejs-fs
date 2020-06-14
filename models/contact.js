//@ts-nocheck

const contactList = [];

module.exports = class Contact {
  constructor(name, email, number, address){
    this.name = name;
    this.email = email;
    this.number = number;
    this.address = address;
  }

  save() {
    contactList.push(this)
    return contactList
  }

  static deleteContacts(){
    contactList.length = 0;
  }

  static getContacts(){
    return contactList
  }

}

