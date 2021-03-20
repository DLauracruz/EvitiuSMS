import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";
import { AddGroup } from "../popup/AddGroup";
import { EditGroup } from "../popup/EditGroup";
import { SendTemplate } from "../popup/SendTemplate";

export const GroupsPage = () => {
  const { dispatch, contactsState } = useContext(ContactsContext);
  const { groups } = contactsState;
  const { addToast } = useToasts();

  const removeGroup = (idx, name) => {
    dispatch({ type: types.removeGroup, payload: idx });
    addToast(`Group '${name}' was remove successfully.`, {
      appearance: "error",
    });
  };

  return (
    <div className="groups__page">
      <input type="text" placeholder="Search group" />
      <AddGroup trigger={<button>New Group</button>} />
      <div className="groups__container scroll">
        {groups.map((group, idx) => (
          <div key={idx} className="groups__group b-shadow">
            <div className="group__side">
              <div className="group__title">
                <h3>{group.name.toUpperCase()}</h3>
                <div>
                  <EditGroup
                    trigger={<i className="far fa-edit"></i>}
                    group={idx}
                  />
                  <i
                    onClick={() => removeGroup(idx, group.name)}
                    className="far fa-trash-alt"
                  ></i>
                </div>
              </div>
              <hr />
              <p>{group.desc}</p>
            </div>
            <ul>
              {group.contacts.length < 5 ? (
                group.contacts.map(() => (
                  <li key={idx}>
                    <img src="https://picsum.photos/200/200" alt="" />
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <img src="https://picsum.photos/200/200" alt="" />
                  </li>
                  <li>
                    <img src="https://picsum.photos/200/200" alt="" />
                  </li>
                  <li>
                    <img src="https://picsum.photos/200/200" alt="" />
                  </li>
                  <li>
                    <div>
                      <i className="fas fa-ellipsis-h"></i>
                    </div>
                  </li>
                </>
              )}
            </ul>
            <SendTemplate trigger={<button>Use Template</button>} group={idx} />
          </div>
        ))}
      </div>
    </div>
  );
};
