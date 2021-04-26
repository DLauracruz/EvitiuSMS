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
    if (data.phone) {
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
            name: data.name ? data.name : "No name",
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
          <h4>Add Contact</h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="popup__field">
              <label>Name</label>
              <input type="text" name="name" placeholder="Name user..." />
            </div>
            <div className="popup__field">
              <label>Email</label>
              <input type="email" name="email" placeholder="test@test.com" />
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
              <label>Birthday</label>
              <input type="text" name="birthday" placeholder="12/31/1998" />
            </div>
            <div className="popup__field">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Atizapan de Zaragoza, Las penitas, Coral #7"
              />
            </div>
            <div className="popup__field">
              <label>Company</label>
              <input type="text" name="company" placeholder="Microsoft" />
            </div>
            <div className="popup__field">
              <label>Website</label>
              <input type="text" name="website" placeholder="www.example.com" />
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
