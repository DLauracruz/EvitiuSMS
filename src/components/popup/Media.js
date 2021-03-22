import React, { useContext, useRef } from "react";

import Popup from "reactjs-popup";
import { ContactsContext } from "../../context/ContactsContext";
import { saveAsZip } from "./downloadAsZip";

export const Media = ({ trigger }) => {
  const { contactsState } = useContext(ContactsContext);
  const { activeContact } = contactsState;

  const ref = useRef();

  const downloadAll = async () => {
    const files = await activeContact.messages.filter(
      ({ message, file }) => message.length === 0 && file
    );
    const urls = await files.map(({ file }) => URL.createObjectURL(file));
    saveAsZip(urls);
  };

  return (
    <Popup ref={ref} trigger={trigger} modal>
      {(close) => (
        <div className="popup__media">
          <h4>Media</h4>

          <div className="media">
            {activeContact.messages.map(
              ({ message, file }, idx) =>
                message.length === 0 && (
                  <div className="media__download b-shadow">
                    {console.log(file)}
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                    />
                    <a href={URL.createObjectURL(file)} download>
                      <i class="fas fa-download"></i> Download
                    </a>
                  </div>
                )
            )}
          </div>

          <div className="popup__actions">
            <button onClick={downloadAll}>
              <i class="fas fa-download"></i> Download All
            </button>
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </Popup>
  );
};
