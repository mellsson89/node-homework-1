const { Command } = require('commander');
const program = new Command();
const chalk=require('chalk')
const {listContacts,getContactById,addContact,removeContact} = require('./contacts')

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

  program.parse(process.argv);

const argv = program.opts();

const invokeAction= async ({ action, id, name, email, phone }) => {
    switch (action) {
      case 'list':
        const contacts=await listContacts();
        console.table(contacts);
        break;
  
      case 'get':
        const contact = await getContactById(id);
        if(contact) {
          console.log(chalk.blue('Contact found: '));
          console.log(contact);
          return;
        }
        console.log(chalk.red('Contact not found!!!'));
        break;
  
      case 'add':
          const contactAdd = await addContact(name, email, phone);
          console.log(chalk.blue('Add contact succes:'))
          console.log(contactAdd);
        break;
  
      case 'remove':
         const removeContactId = await removeContact(id);
         if(removeContactId) {
          console.log(chalk.blue('Delete contact by ID:'))
          console.log(removeContactId);
          return;
         }
         console.log(chalk.red('Contact not found!!!'))
        break;
  
      default:
        console.warn(chalk.red('Unknown action type!'));
    }
  }
  
  invokeAction(argv);