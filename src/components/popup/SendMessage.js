import React, { useContext, useRef, useState } from "react";

import Popup from "reactjs-popup";
import { ContactsContext } from "../../context/ContactsContext";
import { useToasts } from "react-toast-notifications";
import { types } from "../../context/contactsTypes";
import { scrollToBottomAnimated } from "../../helpers/scrollToBottom";

export const SendMessage = ({ trigger }) => {
  const [search, setSearch] = useState("");
  const { addToast } = useToasts();
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { contacts, activeContact } = contactsState;
  const [sltdContacts, setSltdContacts] = useState([]);
  const [message, setMessage] = useState("");

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  const selectedClass = (cond, array) => array.includes(cond);

  const searchContact = ({ target }) => {
    setSearch(target.value);
  };

  const selected = (init, set, cond) => {
    if (init.includes(cond)) {
      set(init.filter((sel) => sel !== cond));
    } else {
      set([...init, cond]);
    }
  };

  const onChange = ({ target }) => setMessage(target.value);

  const sendMessage = () => {
    if (message.length > 0 && sltdContacts.length > 0) {
      sltdContacts.map((id) => {
        dispatch({
          type: types.updateUnreaded,
          payload: { id, value: 1 },
        });

        dispatch({
          type: types.addMultiMessages,
          payload: {
            id,
            message: { origin: "from", message, date: new Date().toString() },
          },
        });
      });

      addToast(`Message '${message}' was sended successfully.`, {
        appearance: "info",
      });

      setMessage("");
      setSltdContacts([]);
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
        <div className="popup__send-message">
          <h4>Send Message</h4>

          <textarea
            onChange={onChange}
            value={message}
            className="b-shadow"
            placeholder="Write your message..."
          ></textarea>

          <div className="popup__contacts">
            <input
              onChange={searchContact}
              value={search}
              type="text"
              placeholder="Search..."
            />
            <ul className="scroll">
              {contacts.map(
                (contact, idx) =>
                  contact.name.toLowerCase().includes(search.toLowerCase()) && (
                    <li
                      onClick={() =>
                        selected(sltdContacts, setSltdContacts, contact._id)
                      }
                      className={`b-shadow ${
                        selectedClass(contact._id, sltdContacts) &&
                        "popup__send-message-selected"
                      }`}
                      key={idx}
                    >
                      <img
                        className="circle-img"
                        src="https://picsum.photos/200/200"
                      />
                      <span>{contact.name}</span>
                    </li>
                  )
              )}
            </ul>
          </div>

          <div className="popup__actions">
            <button onClick={sendMessage}>Confirm</button>
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </Popup>
  );
};
