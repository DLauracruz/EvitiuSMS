import React, { useCallback, useContext, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ContactsContext } from "../../context/ContactsContext";
import { scrollToBottom } from "../../helpers/scrollToBottom";

export const Messages = ({ dispatchFiles }) => {
  const { contactsState } = useContext(ContactsContext);
  const { activeContact, activeTeam } = contactsState;

  const onDrop = useCallback((acceptedFiles) => {
    dispatchFiles(acceptedFiles);
  }, []);

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    scrollToBottom("messages");
  }, [isDragActive]);

  return (
    <div
      id="messages"
      className="messages__messages scroll b-shadow"
      {...getRootProps()}
    >
      {activeContact.messages.map(({ origin, message, file }, idx) =>
        message.length !== 0 ? (
          <p
            key={idx}
            className={`message__${origin === "from" ? "from" : "to"}`}
          >
            {message}
          </p>
        ) : (
          <img key={idx} src={URL.createObjectURL(file)} alt={file.name} />
        )
      )}

      <div className="messages__drop-zone">
        {isDragActive && <p className="drag">Drop the files here ...</p>}
      </div>
    </div>
  );
};
