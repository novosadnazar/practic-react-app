import React, { Component } from "react";

export class ContactList extends Component {
  render() {
    // Деструктуризація пропсів, які прийшли від App
    const { contacts } = this.props;

    return (
      <ul>
        {contacts.map(({ id, name, number }) => (
          <li key={id}>
            {name}: {number}
          </li>
        ))}
      </ul>
    );
  }
}
