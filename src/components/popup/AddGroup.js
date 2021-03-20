import React, { useContext, useEffect, useRef, useState } from "react";

import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";
import { ContactsContext } from "../../context/ContactsContext";
import { useToasts } from "react-toast-notifications";
import { types } from "../../context/contactsTypes";

export const AddGroup = ({ trigger }) => {
  const { addToast } = useToasts();
  const { register, handleSubmit, reset } = useForm();
  const { dispatch, contactsState } = useContext(ContactsContext);
  const { contacts } = contactsState;
  const [sltdContacts, setSltdContacts] = useState([]);
  const [searchContacts, setSearchContacts] = useState("");

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  const onSubmit = (data) => {
    if (data.name && data.desc) {
      dispatch({
        type: types.addGroup,
        payload: {
          name: data.name,
          desc: data.desc,
          contacts: [...sltdContacts],
        },
      });

      addToast(`Group '${data.name}' was added successfully.`, {
        appearance: "success",
      });

      reset();
      setSltdContacts([]);
      closeTooltip();
    } else {
      addToast(
        `You need to fill all inputs if you want create a new template.`,
        {
          appearance: "error",
        }
      );
    }
  };

  const searchContact = ({ target }) => {
    setSearchContacts(target.value);
  };

  const selected = (init, set, cond) => {
    if (init.includes(cond)) {
      set(init.filter((sel) => sel !== cond));
    } else {
      set([...init, cond]);
    }
  };

  const selectedClass = (cond, array) => array.includes(cond);

  return (
    <Popup ref={ref} trigger={trigger} modal>
      {(close) => (
        <div className="popup__group">
          <h4>Add Group</h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="popup__field">
              <label>Group Name</label>
              <input
                ref={register({ required: true })}
                type="text"
                name="name"
                placeholder="Group name..."
              />
            </div>
            <div className="popup__field">
              <label>Description</label>
              <input
                ref={register({ required: true })}
                type="text"
                name="desc"
                placeholder="This group is..."
              />
            </div>

            <div className="popup__group-contacts">
              <input
                onChange={searchContact}
                value={searchContacts}
                type="text"
                placeholder="Search..."
              />

              <ul className="scroll">
                {contacts.map(
                  (contact, idx) =>
                    contact.name
                      .toLowerCase()
                      .includes(searchContacts.toLowerCase()) && (
                      <li
                        onClick={() =>
                          selected(sltdContacts, setSltdContacts, contact._id)
                        }
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

            <div className="popup__actions">
              <button type="submit">Confirm</button>
              <button onClick={close}>Close</button>
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
};
