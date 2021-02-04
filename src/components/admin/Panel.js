import React, { useContext } from "react";
import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";
import { AddUser } from "../popup/AddUser";

export const Panel = ({ setSearch, search }) => {
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { activeFilter } = contactsState;

  const searchContact = ({ target }) => {
    setSearch(target.value);
  };

  const filters = ["personal", "admin", "user", "all"];

  const setActivefilter = (filter) =>
    dispatch({ type: types.setActiveFilter, payload: filter });

  return (
    <div className="admin__panel">
      <h4>Admin Panel</h4>
      <input
        onChange={searchContact}
        value={search}
        type="text"
        placeholder="Search..."
      />

      <AddUser
        oppened={true}
        trigger={
          <button className="btn btn-primary btn-block">
            Add User <i className="fa fa-plus"></i>
          </button>
        }
      />

      <ul className="admin__panel-container b-shadow">
        {filters.map((filter, idx) => (
          <li
            onClick={() => setActivefilter(filter)}
            className={`${activeFilter === filter && "admin__panel-selected"}`}
            key={idx}
          >
            {filter.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};
