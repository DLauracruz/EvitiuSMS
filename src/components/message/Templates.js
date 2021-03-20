import React, { useContext } from "react";
import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";
import { AddTemplate } from "../popup/AddTemplate";

export const Templates = () => {
  const { dispatch, contactsState } = useContext(ContactsContext);
  const { templates, activeTemplate } = contactsState;

  return (
    <div className="message__templates">
      <input type="text" placeholder="Search..." />

      <AddTemplate trigger={<button>New Template</button>} />

      <ul className="b-shadow">
        {templates.map((template, idx) => (
          <li
            onClick={() => {
              dispatch({ type: types.setActiveTemplate, payload: idx });
            }}
            key={idx}
            className={`${activeTemplate === idx && "selected"}`}
          >
            {template.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
