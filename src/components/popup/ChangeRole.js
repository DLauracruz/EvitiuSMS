import React, { useContext, useRef, useState } from "react";

import Popup from "reactjs-popup";
import { ContactsContext } from "../../context/ContactsContext";
import { useToasts } from "react-toast-notifications";
import { types } from "../../context/contactsTypes";

export const ChangeRole = ({ trigger }) => {
  const [searchContacts, setSearchContacts] = useState("");
  const { addToast } = useToasts();
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { contacts } = contactsState;
  const [sltdContacts, setSltdContacts] = useState([]);
  const roles = ["personal", "admin"];

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  const selectedClass = (cond, array) => {
    console.log(sltdContacts);
    return cond === array[0]?._id;
  };

  const searchContact = ({ target }) => {
    setSearchContacts(target.value);
  };

  const selected = (contact) => {
    setSltdContacts([contact]);
  };

  const changeRole = (e) => {
    dispatch({
      type: types.changeRole,
      payload: { id: sltdContacts[0]._id, role: e.target.value },
    });

    addToast(`Role changed successfully to ${e.target.value}.`, {
      appearance: "success",
    });
  };

  return (
    <Popup ref={ref} trigger={trigger} modal>
      {(close) => (
        <div className="popup__add-contact">
          <h4>Change Role</h4>

          <div className="popup__add-contact-list">
            <input
              onChange={searchContact}
              value={searchContacts}
              type="text"
              placeholder="Search..."
            />
            <label>Contacts</label>
            <ul className="scroll">
              {contacts.map(
                (contact, idx) =>
                  contact.name
                    .toLowerCase()
                    .includes(searchContacts.toLowerCase()) && (
                    <li
                      onClick={() => selected(contact)}
                      className={`b-shadow ${
                        selectedClass(contact._id, sltdContacts) &&
                        "popup__add-team-selected"
                      }`}
                      key={idx}
                    >
                      <img
                        className="circle-img"
                        src="https://picsum.photos/200/200"
                      />
                      <div>
                        <span>{contact.name}</span>
                        <div className="popup_add-contact-teams">
                          {contact.teams.map(
                            (team, idx) =>
                              team.name !== "contacts" && (
                                <span key={idx}>{team.name}</span>
                              )
                          )}
                        </div>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>
          <div className="popup__change-contact-role">
            <label>Contact</label>
            <div className="popup__contact-role">
              <div>Name: {sltdContacts[0]?.name}</div>
              <div>Role: {sltdContacts[0]?.role}</div>
              <div>Phone: {sltdContacts[0]?.phone}</div>
              <div>Teams:</div>
              <div>
                {sltdContacts[0]?.teams.map(({ name }) => (
                  <span>{name}</span>
                ))}
              </div>

              <select onChange={changeRole} name="role" id="role">
                {roles.map((role) => (
                  <option
                    selected={`${role === sltdContacts[0]?.role && "selected"}`}
                  >
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="popup__actions">
            <button>Confirm</button>
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </Popup>
  );
};
