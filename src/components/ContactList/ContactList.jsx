import React, { useContext } from "react";
import { AppContext } from "../../App";

const ContactList = () => {
  const { filteredContacts, handleDelete } = useContext(AppContext);

  const handleDeleteClick = (evt) => {
    const idToDelete = evt.currentTarget.getAttribute("data-id");
    handleDelete(idToDelete);
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
