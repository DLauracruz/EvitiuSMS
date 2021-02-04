import React, { useContext, useState } from "react";

import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";

import { scrollToBottomAnimated } from "../../helpers/scrollToBottom";
import { Messages } from "./Messages";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { activeContact, activeTeam } = contactsState;

  const onChange = ({ target }) => {
    setMessage(target.value);
  };

  const dispatchFiles = (files) => {
    files.map((file) => {
      dispatch({
        type: types.addMessage,
        payload: { origin: "from", message: "", file },
      });
    });

    setTimeout(() => {
      scrollToBottomAnimated("messages");
    }, 50);
  };

  const fileHandler = (e) => {
    dispatchFiles(Array.from(e.target.files));
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && message.length > 0) {
      await dispatch({
        type: types.addMessage,
        payload: { origin: "from", message: message },
      });

      setMessage("");

      setTimeout(() => {
        scrollToBottomAnimated("messages");
      }, 10);
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__user-info b-shadow">
          <img
            className="circle-img"
            src="https://picsum.photos/200/200"
            alt=""
          />
          {activeTeam === "contacts" ? (
            <div>
              <h3>{activeContact.name}</h3>
              <span>{activeContact.phone}</span>
            </div>
          ) : (
            <h3>{activeTeam}</h3>
          )}
        </div>

        <div className="chat__action-buttons">
          <button className="btn btn-primary btn-block">
            Print <i className="fa fa-print"></i>
          </button>
          <button className="btn btn-primary btn-block">
            <i className="fas fa-angle-double-down"></i>
          </button>
        </div>
      </div>

      <Messages dispatchFiles={dispatchFiles} />

      <div className="chat__input">
        <input
          onChange={onChange}
          value={message}
          onKeyDown={sendMessage}
          type="text"
          placeholder="Write a message..."
        />
        <i className="fa fa-paper-plane"></i>
        <input multiple type="file" onChange={fileHandler} className="foo" />
      </div>
    </div>
  );
};
