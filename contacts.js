const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  return contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = JSON.stringify(
    contacts.filter((contact) => contact.id !== contactId)
  );

  return fs.writeFile(contactsPath, updatedContacts, "utf8");
}

async function addContact(name, email, phone) {}
