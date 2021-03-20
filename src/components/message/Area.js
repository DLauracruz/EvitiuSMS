import React, { useContext } from "react";
import { ContactsContext } from "../../context/ContactsContext";

export const Area = () => {
  const { contactsState } = useContext(ContactsContext);
  const { templates, activeTemplate } = contactsState;

  return (
    <div className="message__area">
      <div className="message__header">
        <div className="message__user-info b-shadow">
          <img
            className="circle-img"
            src="https://picsum.photos/200/200"
            alt=""
          />
          <div>
            <h3>{templates[activeTemplate].name}</h3>
          </div>
        </div>
      </div>

      <textarea
        className="b-shadow"
        placeholder="Write Something..."
        value={templates[activeTemplate].message}
      ></textarea>
    </div>
  );
};
