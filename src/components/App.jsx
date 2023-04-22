import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { StyledWrapper } from './App.styled';
import { useState, useEffect } from 'react';

const CONTACTS_KEY = 'contacts_key';
const INITIAL_STATE = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const store = JSON.parse(window.localStorage.getItem(CONTACTS_KEY));
    return store && store.length > 0 ? store : INITIAL_STATE;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    if (
      contacts.some(contact =>
        contact.name.toLowerCase().includes(data.name.toLowerCase())
      )
    )
      return alert(`${data.name} is already in contacts`);
    {
      const newContact = { id: nanoid(), ...data };
      setContacts(prevState => {
        return [...prevState, newContact];
      });
    }
  };

  const registerFilter = e => {
    setFilter(e.target.value);
  };

  const handlefilteredContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const handleDeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <StyledWrapper>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter onChangeFilter={registerFilter} />
      <ContactList
        contacts={handlefilteredContacts()}
        onDeleteContact={handleDeleteContact}
      />
    </StyledWrapper>
  );
};
