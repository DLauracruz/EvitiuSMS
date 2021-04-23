import React, { useContext, useState } from "react";
import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";
import { scrollToBottom } from "../../helpers/scrollToBottom";

import * as R from "ramda";
import { NumberMessage } from "../popup/NumberMessage";

export const Contacts = () => {
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { contacts, teams, activeContact, activeTeam } = contactsState;
  const [search, setSearch] = useState("");

  const selectContact = async (contact) => {
    await dispatch({ type: types.setActiveContact, payload: contact });
    await dispatch({ type: types.setUnreaded });
    scrollToBottom("messages");
  };

  const selectTeam = (team) => {
    dispatch({ type: types.setActiveTeam, payload: team });
  };

  const searchContact = ({ target }) => {
    setSearch(target.value);
  };

  const propTeamName = (teams) => {
    const hasTeam = R.propEq("name", activeTeam.name);
    return R.filter(hasTeam, teams).length > 0 ? true : false;
  };

  return (
    <div className="contacts">
      <div className="contacts__teams b-shadow">
        <h4>{activeTeam.name}</h4>
        <ul className="scroll">
          {teams.map((team, idx) => (
            <li
              onClick={() => selectTeam(team)}
              key={idx}
              className={`${
                activeTeam.name === team.name && "contacts__selected-team"
              }`}
            >
              {team.name}
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
            propTeamName(contact.teams) && (
              <div
                key={idx}
                onClick={() => selectContact(contact)}
                className={`b-shadow ${
                  contact._id === activeContact._id &&
                  activeTeam.name === "contacts"
                    ? "contacts__selected-contact"
                    : ""
                }`}
              >
                <div className="noti">
                  {contact.unreaded !== 0 && activeTeam.name === "contacts" && (
                    <span>
                      {contact.unreaded > 9 ? "+9" : contact.unreaded}
                    </span>
                  )}
                  <img src="https://picsum.photos/200/200" alt="" />
                </div>
                <div>
                  <h5>{contact.name}</h5>
                  {activeTeam.name === "contacts" && (
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

      <NumberMessage
        trigger={
          <button>
            <i class="fas fa-plus"></i>
          </button>
        }
      />
    </div>
  );
};
