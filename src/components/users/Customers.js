import React, { useContext, useState } from "react";
import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";

export const Customers = () => {
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { contacts, activeContact } = contactsState;
  const [search, setSearch] = useState("");

  const selectContact = (contact) => {
    dispatch({ type: types.setActiveContact, payload: contact });
  };

  const searchContact = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <div className="notes__customers">
      <input
        onChange={searchContact}
        value={search}
        type="text"
        placeholder="Search..."
      />

      <div className="customers__list scroll">
        {contacts.map(
          (contact, idx) =>
            contact.name.toLowerCase().includes(search.toLowerCase()) && (
              <div
                key={idx}
                onClick={() => selectContact(contact)}
                className={`b-shadow ${
                  contact._id === activeContact._id &&
                  "customers__selected-contact"
                }`}
              >
                <img
                  className="circle-img"
                  src="https://picsum.photos/200/200"
                  alt=""
                />
                <div>
                  <h5>
                    {contact.name} <legend>{contact.phone}</legend>
                  </h5>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};
