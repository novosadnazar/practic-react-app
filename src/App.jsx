import { Component } from "react";
import { nanoid } from "nanoid";
import "./App.css";


import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    name: "",
    number: "",
  };

  componentDidMount() {
    const data = localStorage.getItem("contacts");
    if (data) {
      try {
        this.setState({
          contacts: JSON.parse(data),
        });
      } catch (error) {
        console.error("Помилка парсингу localStorage:", error);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = (evt) => {
 
    if (evt.preventDefault) evt.preventDefault();

    const { name, number, contacts } = this.state;

    if (name.trim() === "" || number.trim() === "") {
      alert("Будь ласка, заповніть усі поля");
      return;
    }

    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
      name: "",
      number: "",
    }));
  };

  handleInput = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleFilter = (evt) => {
    this.setState({ filter: evt.target.value });
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((item) => item.id !== id),
    }));
  };

  render() {
    const { contacts, filter, name, number } = this.state;
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleSubmit}
          onChange={this.handleInput}
          number={number}
          name={name}
        />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilter} />
        <ContactList
          filteredContacts={filteredContacts}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;