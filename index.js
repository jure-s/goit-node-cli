import { program } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, ...data }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await listContacts();
        console.log("allContacts", allContacts);
        break;

      case "get":
        const oneContact = await getContactById(id);
        console.log("oneContact", oneContact);
        break;

      case "add":
        const addNewContact = await addContact(data);
        console.log("addNewContact", addNewContact);
        break;

      case "remove":
        const deleteContact = await removeContact(id);
        console.log("deleteContact", deleteContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

invokeAction(options);
