import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    throw error;
  }
};

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    return contact || null;
  } catch (error) {
    throw error;
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((item) => item.id === contactId);

    if (contactIndex === -1) {
      return null;
    }

    const [result] = contacts.splice(contactIndex, 1);
    await updateContacts(contacts);
    return result;
  } catch (error) {
    throw error;
  }
};

export const addContact = async (data) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: nanoid(),
      ...data,
    };

    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    throw error;
  }
};
