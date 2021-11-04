const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  return console.log(
    contacts.find((contact) => contact.id === Number(contactId))
  );
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = JSON.stringify(
    contacts.filter((contact) => contact.id !== contactId)
  );
  console.log(JSON.parse(updatedContacts));

  return fs.writeFile(contactsPath, updatedContacts, "utf8");
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone };
  const updatedContacts = JSON.stringify([...contacts, newContact]);
  console.log(newContact);
  return await fs.writeFile(contactsPath, updatedContacts, "utf8");
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
