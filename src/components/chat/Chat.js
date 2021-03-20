import React, { useContext, useState } from "react";

import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";

import { scrollToBottomAnimated } from "../../helpers/scrollToBottom";
import { Messages } from "./Messages";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { activeContact, activeTeam, teamsMessages } = contactsState;

  const onChange = ({ target }) => {
    setMessage(target.value);
  };

  const dispatchFiles = (files) => {
    files.map((file) => {
      if (activeTeam.name === "contacts") {
        dispatch({
          type: types.addMessage,
          payload: { origin: "from", message: "", file },
        });
      } else {
        dispatch({
          type: types.addTeamsMessage,
          payload: { origin: "from", message: "", file },
        });
      }
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
      if (activeTeam.name === "contacts") {
        await dispatch({
          type: types.addMessage,
          payload: {
            origin: "from",
            message: message,
            date: new Date().toString(),
          },
        });
      } else {
        await dispatch({
          type: types.addTeamsMessage,
          payload: {
            team: activeTeam.name,
            message: {
              origin: "from",
              message: message,
              date: new Date().toString(),
            },
          },
        });
      }

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
          {activeTeam.name === "contacts" ? (
            <div>
              <h3>{activeContact.name}</h3>
              <span>{activeContact.phone}</span>
            </div>
          ) : (
            <div>
              <h3>{activeTeam.name.toUpperCase()}</h3>
              <span>{activeTeam.phone}</span>
            </div>
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
