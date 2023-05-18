import React, { useState, useEffect} from 'react';
import shortid from 'shortid';
import css from './App.module.css';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import Notification from './Notification';

export default function App() {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');


  function addContact ({ name, number }) {
    const normalizedName = name.toLowerCase();

    let isAdded = false;
    contacts.forEach(el => {
      if (el.name.toLowerCase() === normalizedName) {
        alert(`${name} is already in contacts`);
        isAdded = true;
      }
    });

    if (isAdded) {
      return;
    }
    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    setContacts(prevContacts => [...prevContacts, contact])
      
  };

  function changeFilter (e) {
    setFilter(e.currentTarget.value.trim());
  };

  function getVisibleContacts() {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  function deleteContact (todoId) {
    setContacts(prevState => prevState.filter(contact => contact.id !== todoId));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  },[contacts])


    const visibleContacts = getVisibleContacts();

    return (
            <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 18,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2 className={css.titleContacts}>Contacts</h2>
        <div className={css.allContacts}>All contacts: {contacts.length}</div>

        {contacts.length > 0 ? (
          <>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={deleteContact}
            />
          </>
        ) : (
          <Notification message="Contact list is empty" />
        )}
      </div>
    );
  }


// class App extends Component {
//   state = {
//     contacts: [
//       // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   addContact = ({ name, number }) => {
//     const normalizedName = name.toLowerCase();

//     let isAdded = false;
//     this.state.contacts.forEach(el => {
//       if (el.name.toLowerCase() === normalizedName) {
//         alert(`${name} is already in contacts`);
//         isAdded = true;
//       }
//     });

//     if (isAdded) {
//       return;
//     }
//     const contact = {
//       id: shortid.generate(),
//       name: name,
//       number: number,
//     };
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, contact],
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   deleteContact = todoId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== todoId),
//     }));
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const { contacts, filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();

//     return (
//             <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//           fontSize: 18,
//           color: '#010101',
//         }}
//       >
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} />

//         <h2 className={css.titleContacts}>Contacts</h2>
//         <div className={css.allContacts}>All contacts: {contacts.length}</div>

//         {contacts.length > 0 ? (
//           <>
//             <Filter value={filter} onChange={this.changeFilter} />
//             <ContactList
//               contacts={visibleContacts}
//               onDeleteContact={this.deleteContact}
//             />
//           </>
//         ) : (
//           <Notification message="Contact list is empty" />
//         )}
//       </div>
//     );
//   }
// }

// export default App;