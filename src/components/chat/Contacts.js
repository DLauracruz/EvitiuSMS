import React, { useContext, useState } from "react";
import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";
import { scrollToBottom } from "../../helpers/scrollToBottom";

export const Contacts = () => {
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { contacts, teams, activeContact, activeTeam } = contactsState;
  const [search, setSearch] = useState("");

  const selectContact = async (contact) => {
    await dispatch({ type: types.setActiveContact, payload: contact });
    await dispatch({ type: types.setUnreaded });
    scrollToBottom("messages");
  };

  const selectTeam = (team) =>
    dispatch({ type: types.setActiveTeam, payload: team });

  const searchContact = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <div className="contacts">
      <div className="contacts__teams b-shadow">
        <h4>{activeTeam}</h4>
        <ul className="scroll">
          {teams.map((team, idx) => (
            <li
              onClick={() => selectTeam(team)}
              key={idx}
              className={`${activeTeam === team && "contacts__selected-team"}`}
            >
              {team}
            </li>
          ))}
        </ul>
      </div>

      <input
        onChange={searchContact}
        value={search}
        type="text"
        placeholder="Search..."
      />

      <div className="contacts__list scroll">
        {contacts.map(
          (contact, idx) =>
            contact.name.toLowerCase().includes(search.toLowerCase()) &&
            contact.teams.includes(activeTeam) && (
              <div
                key={idx}
                onClick={() => selectContact(contact)}
                className={`b-shadow ${
                  contact._id === activeContact._id && activeTeam === "contacts"
                    ? "contacts__selected-contact"
                    : ""
                }`}
              >
                <div className="noti">
                  {contact.unreaded !== 0 && activeTeam === "contacts" && (
                    <span>
                      {contact.unreaded > 9 ? "+9" : contact.unreaded}
                    </span>
                  )}
                  <img src="https://picsum.photos/200/200" alt="" />
                </div>
                <div>
                  <h5>{contact.name}</h5>
                  {activeTeam === "contacts" && (
                    <p>
                      {contact.messages[contact.messages.length - 1]?.message ||
                        contact.messages[contact.messages.length - 1]?.file
                          .name ||
                        "No messages"}
                    </p>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};
