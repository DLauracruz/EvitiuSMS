import React, { useContext, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";

export const SearchContacts = () => {
  const { dispatch, contactsState } = useContext(ContactsContext);
  const [searchContacts, setSearchContacts] = useState("");
  const { contacts, activeContact, templates, activeTemplate } = contactsState;
  const [useContacts, setUseContacts] = useState(contacts);
  const [sendTo, setSendTo] = useState([]);
  const { addToast } = useToasts();

  const addContact = (idx) => {
    setSendTo([...sendTo, useContacts[idx]]);
    setUseContacts(useContacts.filter((_, id) => id !== idx));
  };

  const removeContact = (idx) => {
    setUseContacts([...useContacts, sendTo[idx]]);
    setSendTo(sendTo.filter((_, id) => id !== idx));
  };

  const searchContact = ({ target }) => {
    setSearchContacts(target.value);
  };

  const sendMessage = () => {
    sendTo.map(({ _id }) => {
      dispatch({
        type: types.updateUnreaded,
        payload: { id: _id, value: 1 },
      });

      dispatch({
        type: types.addMultiMessages,
        payload: {
          id: _id,
          message: {
            origin: "from",
            message: templates[activeTemplate].message,
            date: new Date().toString(),
          },
        },
      });
    });

    addToast(
      `Message '${templates[activeTemplate].message}' was send successfully.`,
      {
        appearance: "info",
      }
    );

    setUseContacts([...useContacts, ...sendTo]);
    setSendTo([]);
  };

  return (
    <div className="message__contact">
      <button>Edit Template</button>
      <button>Delete Template</button>

      <label>Send your SMS here! Search your contact</label>
      <input onChange={searchContact} type="text" placeholder="Search..." />

      <div className="message__container scroll">
        {useContacts.map(
          (contact, idx) =>
            contact.name
              .toLowerCase()
              .includes(searchContacts.toLowerCase()) && (
              <div key={idx} className="message__badge">
                <div className="b-shadow message__name">
                  <img
                    className="circle-img"
                    src="https://picsum.photos/200/200"
                    alt=""
                  />
                  <span>{contact.name}</span>
                </div>

                <i
                  onClick={() => addContact(idx)}
                  className="b-shadow fas fa-paper-plane"
                ></i>
              </div>
            )
        )}
      </div>
      <hr />

      <h3>Send message to...</h3>
      <div className="message__container-secondary scroll b-shadow">
        {sendTo.map((contact, idx) => (
          <div key={idx} className="message__badge">
            <div className="message__name">
              <img
                className="circle-img"
                src="https://picsum.photos/200/200"
                alt=""
              />
              <span>{contact.name}</span>
              <i
                onClick={() => removeContact(idx)}
                className=" fa fa-times"
              ></i>
            </div>
          </div>
        ))}
      </div>

      <button onClick={sendMessage}>Use Template</button>
    </div>
  );
};
