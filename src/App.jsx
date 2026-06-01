

import { useState, useEffect, createContext, useRef } from "react";
import { nanoid } from "nanoid";
import "./App.css";

import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";


export const AppContext = createContext();

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");

    if (savedContacts) {
      return JSON.parse(savedContacts);
    }

    return [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ];
  });

  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({ name: "", number: "" });


  const nameInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);


  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (evt) => {
    if (evt.preventDefault) evt.preventDefault();

    const { name, number } = form;

    if (name.trim() === "" || number.trim() === "") {
      return;
    }

    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts((prevContacts) => [...prevContacts, newContact]);
    setForm({ name: "", number: "" });

    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  const handleInput = (evt) => {
    const { name, value } = evt.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFilter = (evt) => {
    setFilter(evt.target.value);
  };

  const handleDelete = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((item) => item.id !== id)
    );
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
   
    <AppContext.Provider
      value={{
        form,
        filter,
        filteredContacts,
        nameInputRef, 
        handleSubmit,
        handleInput,
        handleFilter,
        handleDelete,
      }}
    >
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm />

        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </AppContext.Provider>
  );
};

export default App;