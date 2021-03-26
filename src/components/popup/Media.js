import React, { useContext, useRef, useState } from "react";

import Popup from "reactjs-popup";
import { useSaveFilesAsZip } from "use-save-files-as-zip";
import { ContactsContext } from "../../context/ContactsContext";
import ModalImage from "react-modal-image";

import * as R from "ramda";

export const Media = ({ trigger }) => {
  const { contactsState } = useContext(ContactsContext);
  const { activeContact } = contactsState;
  const { setFilesAsZip, saveAsZip } = useSaveFilesAsZip();
  const [selected, setSelected] = useState([]);

  const ref = useRef();

  const downloadAll = async () => {
    const messagesFiles = await activeContact.messages.filter(
      ({ message }, idx) => message.length === 0 && find(idx)
    );

    const files = await messagesFiles.map(({ file }) => file);
    setFilesAsZip(files);
    saveAsZip();
  };

  const find = R.includes(R.__, selected);

  const addRemove = (idx) => {
    if (find(idx)) {
      setSelected([
        ...selected.filter((_, id) => id !== R.indexOf(idx, selected)),
      ]);
    } else {
      setSelected([...selected, idx]);
    }
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
                    <ModalImage
                      small={URL.createObjectURL(file)}
                      large={URL.createObjectURL(file)}
                      alt={file.name}
                    />
                    <a href={URL.createObjectURL(file)} download>
                      <i className="fas fa-download"></i>
                    </a>
                    <a onClick={() => addRemove(idx)}>
                      {find(idx) ? (
                        <i className="far fa-check-square"></i>
                      ) : (
                        <i className="far fa-square"></i>
                      )}
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
