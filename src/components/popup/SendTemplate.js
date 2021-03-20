import React, { useContext, useRef, useState } from "react";

import Popup from "reactjs-popup";
import { ContactsContext } from "../../context/ContactsContext";
import { useToasts } from "react-toast-notifications";
import { types } from "../../context/contactsTypes";

import * as R from "ramda";

export const SendTemplate = ({ trigger, group }) => {
  const [searchContacts, setSearchContacts] = useState("");
  const [searchTemplates, setSearchTemplates] = useState("");
  const { addToast } = useToasts();
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { contacts, groups, activeContact, templates } = contactsState;
  const [sltdTemplate, setSltdTemplate] = useState(templates[0]);

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  const selectedClass = (cond, array) => array.includes(cond);

  const searchContact = ({ target }) => {
    setSearchContacts(target.value);
  };

  const searchTemplate = ({ target }) => {
    setSearchTemplates(target.value);
  };

  const sendTemplate = () => {
    if (groups[group].contacts.length > 0) {
      groups[group].contacts.map((id) => {
        dispatch({
          type: types.updateUnreaded,
          payload: { id, value: 1 },
        });

        dispatch({
          type: types.addMultiMessages,
          payload: {
            id,
            message: {
              origin: "from",
              message: sltdTemplate.message,
              date: new Date().toString(),
            },
          },
        });
      });

      addToast(`Message '${sltdTemplate.message}' was sended successfully.`, {
        appearance: "info",
      });

      closeTooltip();
    } else {
      addToast(
        `You need to write something and select a contact if you want to send a message.`,
        {
          appearance: "error",
        }
      );
    }
  };

  return (
    <Popup ref={ref} trigger={trigger} modal>
      {(close) => (
        <div className="popup__add-contact">
          <h4>Send Template</h4>

          <div className="popup__add-contact-list">
            <input
              onChange={searchContact}
              value={searchContacts}
              type="text"
              placeholder="Search..."
            />
            <label>Group Contacts</label>
            <ul className="scroll">
              {contacts.map(
                (contact, idx) =>
                  selectedClass(contact._id, groups[group].contacts) &&
                  contact.name
                    .toLowerCase()
                    .includes(searchContacts.toLowerCase()) && (
                    <li key={idx} className="b-shadow ">
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
          <div className="popup__add-contact-list">
            <input
              onChange={searchTemplate}
              value={searchTemplates}
              type="text"
              placeholder="Search..."
            />
            <label>Templates</label>
            <ul className="scroll">
              {templates.map(
                (template, idx) =>
                  template.name
                    .toLowerCase()
                    .includes(searchTemplates.toLowerCase()) && (
                    <li
                      onClick={() => setSltdTemplate(template)}
                      className={`b-shadow ${
                        sltdTemplate.name === template.name &&
                        "popup__add-team-selected"
                      }`}
                      key={idx}
                    >
                      {console.log({
                        name: template.name,
                        prop: sltdTemplate.name,
                      })}
                      {console.log(sltdTemplate.name === template.name)}
                      <span>{template.name}</span>
                    </li>
                  )
              )}
            </ul>
          </div>

          <div className="popup__actions">
            <button onClick={sendTemplate}>Confirm</button>
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </Popup>
  );
};
