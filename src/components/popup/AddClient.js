import React, { useContext, useEffect, useRef, useState } from "react";

import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";
import { ContactsContext } from "../../context/ContactsContext";
import { useToasts } from "react-toast-notifications";
import { types } from "../../context/contactsTypes";
import sid from "shortid";

export const AddClient = ({ trigger }) => {
  const { addToast } = useToasts();
  const { dispatch } = useContext(ContactsContext);
  const { register, handleSubmit, reset } = useForm();

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  const onSubmit = (data) => {
    if (data.name && data.email && data.phone) {
      dispatch({
        type: types.addClients,
        payload: [
          {
            _id: sid.generate(),
            teams: [{ name: "clients", phone: 5500000000 }],
            notes: [],
            unreaded: 0,
            messages: [],
            role: "client",
            ...data,
          },
        ],
      });

      addToast(`Client '${data.name}' was added successfully.`, {
        appearance: "success",
      });

      reset();
      closeTooltip();
    } else {
      addToast(`You need to fill all inputs if you want create a new client.`, {
        appearance: "error",
      });
    }
  };

  return (
    <Popup ref={ref} trigger={trigger} modal>
      {(close) => (
        <div className="popup__add-user">
          <h4>Add Client</h4>

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
