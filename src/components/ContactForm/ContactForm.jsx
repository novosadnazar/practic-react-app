import React, { Component } from "react";

export class ContactForm extends Component {
  state = {
    name: "",
    number: "",
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


    if (name.trim() === "" || number.trim() === "") return;


    this.props.onSubmit(name, number);

    // 3. Очищення форми
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            value={name}
            required
          />
        </label>
        <label>
          Number 
          <input
            onChange={this.handleChange}
            type="tel"
            name="number"
            value={number}
            required
          />
        </label>
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}
