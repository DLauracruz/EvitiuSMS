import React, { useContext, useEffect, useRef, useState } from "react";

import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";
import { ContactsContext } from "../../context/ContactsContext";
import { useToasts } from "react-toast-notifications";
import { types } from "../../context/contactsTypes";

export const AddTemplate = ({ trigger }) => {
  const { addToast } = useToasts();
  const { dispatch } = useContext(ContactsContext);
  const { register, handleSubmit, reset } = useForm();

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  const onSubmit = (data) => {
    if (data.name && data.message) {
      dispatch({
        type: types.addTemplate,
        payload: {
          name: data.name,
          message: eval("`" + data.message + "`"),
        },
      });

      addToast(`Template '${data.name}' was added successfully.`, {
        appearance: "success",
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

  return (
    <Popup ref={ref} trigger={trigger} modal>
      {(close) => (
        <div className="popup__add-user">
          <h4>Add Template</h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="popup__field">
              <label>Template Name</label>
              <input
                ref={register({ required: true })}
                type="text"
                name="name"
                placeholder="Template name..."
              />
            </div>
            <div className="popup__field">
              <label>Message</label>
              <input
                ref={register({ required: true })}
                type="text"
                name="message"
                placeholder="Hello, how are you?..."
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
