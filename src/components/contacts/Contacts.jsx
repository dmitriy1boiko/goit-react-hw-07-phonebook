import { useDispatch, useSelector } from 'react-redux';
import { Button, Wrap, Contact } from './Contacts.styled';
import { deleteContact } from 'redux/contactsSlice';

export const Contacts = () => {
  const contacts = useSelector(state => state.contacts);
  const filterContacts = useSelector(state => state.filter);
  const dispatch = useDispatch();
  console.log(filterContacts);

  const handleFilter = () => {
    if (filterContacts === '') return contacts;
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filterContacts.toLowerCase()) ||
        contact.number.includes(filterContacts)
    );
  };

  const filteredContacts = handleFilter();

  return (
    <ul>
      {filteredContacts.map(contact => (
        <li key={contact.id}>
          <Wrap>
            <Contact>
              {contact.name}: {contact.number}
            </Contact>
            <Button
              type="button"
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </Button>
          </Wrap>
        </li>
      ))}
    </ul>
  );
};