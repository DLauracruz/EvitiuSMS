import React, { useContext, useRef } from "react";

import Popup from "reactjs-popup";
import { ContactsContext } from "../../context/ContactsContext";

export const Media = ({ trigger }) => {
  const { contactsState } = useContext(ContactsContext);
  const { activeContact } = contactsState;

  const ref = useRef();

  return (
    <Popup ref={ref} trigger={trigger} modal>
      {(close) => (
        <div className="popup__media">
          <h4>Media</h4>

          <div className="media">
            {activeContact.messages.map(
              ({ message, file }, idx) =>
                message.length === 0 && (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                )
            )}
          </div>

          <div className="popup__actions">
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </Popup>
  );
};
