import React, { useContext, useRef, useState } from "react";

import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";
import { ContactsContext } from "../../context/ContactsContext";
import { useToasts } from "react-toast-notifications";
import { types } from "../../context/contactsTypes";

export const EditGroup = ({ trigger, group }) => {
  const { addToast } = useToasts();
  const { register, handleSubmit, reset } = useForm();
  const { dispatch, contactsState } = useContext(ContactsContext);
  const { groups, contacts } = contactsState;
  const [sltdContacts, setSltdContacts] = useState([]);
  const [searchContacts, setSearchContacts] = useState("");

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  const onSubmit = (data) => {
    if (data.name && data.desc) {
      dispatch({
        type: types.editGroup,
        payload: {
          id: group,
          name: data.name,
          desc: data.desc,
        },
      });

      addToast(`Group '${data.name}' was edited successfully.`, {
        appearance: "info",
      });

      reset();
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

  const currentContact = (cond, array) => array.includes(cond);

  return (
    <Popup ref={ref} trigger={trigger} modal>
      {(close) => (
        <div className="popup__group">
          <h4>Edit Group</h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="popup__field">
              <label>Group Name</label>
              <input
                ref={register({ required: true })}
                type="text"
                name="name"
                placeholder="Group name..."
                defaultValue={groups[group].name}
              />
            </div>
            <div className="popup__field">
              <label>Description</label>
              <input
                ref={register({ required: true })}
                type="text"
                name="desc"
                placeholder="This group is..."
                defaultValue={groups[group].desc}
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
                    currentContact(contact._id, groups[group].contacts) &&
                    contact.name
                      .toLowerCase()
                      .includes(searchContacts.toLowerCase()) && (
                      <li
                        onClick={() =>
                          selected(sltdContacts, setSltdContacts, contact._id)
                        }
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
