import React, { useContext, useEffect, useRef, useState } from "react";

import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";
import { ContactsContext } from "../../context/ContactsContext";
import { useToasts } from "react-toast-notifications";
import { types } from "../../context/contactsTypes";
import * as sid from "shortid";

export const AddUser = ({ trigger }) => {
  const { addToast } = useToasts();
  const { dispatch } = useContext(ContactsContext);
  const { register, handleSubmit, reset } = useForm();

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  const onSubmit = (data) => {
    if (
      data.name &&
      data.email &&
      data.phone &&
      data.role !== "Select one option..."
    ) {
      dispatch({
        type: types.addContacts,
        payload: [
          {
            _id: sid.generate(),
            teams: ["contacts"],
            notes: [],
            unreaded: 0,
            messages: [],
            ...data,
          },
        ],
      });

      addToast(`User '${data.name}' was added successfully.`, {
        appearance: "success",
      });

      reset();
      closeTooltip();
    } else {
      addToast(`You need to fill all inputs if you want create a new user.`, {
        appearance: "error",
      });
    }
  };

  return (
    <Popup ref={ref} trigger={trigger} modal>
      {(close) => (
        <div className="popup__add-user">
          <h4>Add User</h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="popup__field">
              <label>Name</label>
              <input
                ref={register({ required: true })}
                type="text"
                name="name"
                placeholder="Name user..."
              />
            </div>
            <div className="popup__field">
              <label>Email</label>
              <input
                ref={register({ required: true })}
                type="email"
                name="email"
                placeholder="test@test.com"
              />
            </div>
            <div className="popup__field">
              <label>Phone</label>
              <input
                ref={register({ required: true })}
                type="text"
                name="phone"
                placeholder="+ 52 00 0000 0000"
              />
            </div>
            <div className="popup__field">
              <label>Role</label>
              <select ref={register({ required: true })} name="role">
                <option>Select one option...</option>
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
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
