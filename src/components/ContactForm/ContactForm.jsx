import React, { useContext } from "react";
import { AppContext } from "../../App"; 

const ContactForm = () => {

  const { form, handleInput, handleSubmit, nameInputRef } =
    useContext(AppContext);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          ref={nameInputRef} 
          onChange={handleInput}
          value={form.name}
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <br />
      <label>
        Number:
        <input
          type="tel"
          name="number"
          onChange={handleInput}
          value={form.number}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
