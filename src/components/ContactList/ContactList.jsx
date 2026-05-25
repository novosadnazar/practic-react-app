import React from "react";

const ContactList = ({ filteredContacts, onDelete }) => {
  const handleDeleteClick = (evt) => {
    const idToDelete = evt.currentTarget.getAttribute("data-id");
    onDelete(idToDelete);
  };

  return (
    <ul>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
          <button type="button" data-id={id} onClick={handleDeleteClick}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
