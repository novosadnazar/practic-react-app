
import "./App.css"
import { nanoid } from "nanoid";
import React, { Component } from "react";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    name: "",
    number: "",
    filter: "",
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, number } = this.state;
    if (this.state.name.trim() === "") return;

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
      name: "",
      number: "",
      filter: "",
    }));
  };

  render() {
    const { contacts, name, number, filter } = this.state;
    const filteredContacts = contacts.filter((item) => {
      return item.name.toLowerCase().includes(filter.toLowerCase())
    })
    return (
      <>
        <h2>Phone Book</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              value={name} // Тепер інпут контрольований
              required
            />
          </label>
          <label>
            Numder
            <input
              onChange={this.handleChange}
              type="tel"
              name="number"
              value={number}
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">Add Contact</button>
        </form>

        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <input
          onChange={this.handleChange}
          type="text"
          name="filter"
          value={filter}
        />
        <ul>
          {filteredContacts.map((item) => (
            <li key={item.id}>
              {item.name}: {item.number}
            </li>
          ))}
        </ul>
      </>
    );
  }
}
//
export default App;