// import { addContact } from 'redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
// import { Form, Input, SubButton } from './BookcontactsForm.styles';
import { useEffect, useState } from 'react';
import { addContacts, getContacts } from 'redux/operations';
import { selectorContacts } from 'redux/selectors';

export default function Bookcontact() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectorContacts);
 

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newContact = {
      name: name,
      phone: number,
    };

    const isInContacts = contacts.find(
      contact =>
        contact.name.toLowerCase() === newContact.name.toLowerCase() ||
        contact.phone === newContact.phone
    );
    if (isInContacts) {
      alert(
        `${newContact.name} or ${newContact.phone} has already existed`
      );
      setName('');
    setNumber('');
      return;
    }
    
    dispatch(addContacts(newContact));

    setName('');
    setNumber('');
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Name</h3>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
        <h3>Number</h3>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
        <button type="submit">Add contact</button>
      </div>
    </form>
  );
}
