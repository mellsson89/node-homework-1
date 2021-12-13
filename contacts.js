const fs = require('fs/promises');
const path = require('path');
const crypto=require('crypto')

const contactsPath = path.join(__dirname,'db','contacts.json');

const readFile =async () => {
    try {
        const response= await fs.readFile(contactsPath,'utf8');
        const result=JSON.parse(response);
        return result;
    } catch (error) {
        console.error(error)
    }
}

const listContacts=async () => {
    try {
        return await readFile();
    } catch (error) {
       console.error(error) 
    }
  }
  
  const getContactById= async (contactId) => {

  try {
    const contacts= await readFile();
    const [contact]=contacts.filter(contact => contact.id === contactId);
    return contact;

  } catch(error) {
      console.error(error)
  }
  }
  
  const removeContact= async (contactId) => {

    try {
        const contacts= await readFile();
        const [contactDelete]=contacts.filter(contact => contact.id === contactId);
        const removeContact=contacts.filter(contact => contact.id !== contactId);
        await fs.writeFile(contactsPath,JSON.stringify(removeContact,null,2));
        return contactDelete;

    } catch (error) {
        console.error(error)
    }
  }
  
 const addContact = async (name, email, phone) => {
     try {
        const id=crypto.randomUUID();
        const contact={id,name,email,phone};
        const contacts = await readFile(contact)
        contacts.push(contact);
        await fs.writeFile(contactsPath,JSON.stringify(contacts,null,2));
        return contact;
     } catch (error) {
         console.error(error)
     }
  }

  module.exports= {
    listContacts,
    getContactById,
    addContact,
    removeContact
  }