import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useDropzone } from "react-dropzone";
import { ContactsContext } from "../../context/ContactsContext";
import { scrollToBottom } from "../../helpers/scrollToBottom";

import * as fns from "date-fns";
import { types } from "../../context/contactsTypes";

export const Messages = ({ dispatchFiles }) => {
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { activeContact, activeTeam, teamsMessages } = contactsState;
  const [mouseOver, setMouseOver] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    dispatchFiles(acceptedFiles);
  }, []);

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const pendingMessage = (date) => {
    if (fns.isBefore(Date.parse(date), fns.endOfYesterday())) {
      return false;
    } else {
      if (
        fns.isAfter(Date.parse(date), fns.addHours(fns.startOfToday(), 8)) &&
        fns.isBefore(Date.parse(date), fns.addHours(fns.startOfToday(), 20))
      ) {
        return false;
      } else {
        return true;
      }
    }
  };

  const distanceFormat = (date) => {
    if (fns.isAfter(Date.parse(date), fns.addHours(fns.startOfToday(), 20))) {
      return fns.formatDistance(
        fns.addHours(fns.startOfTomorrow(), 8),
        Date.parse(date)
      );
    } else {
      return fns.formatDistance(
        fns.addHours(fns.startOfToday(), 8),
        Date.parse(date)
      );
    }
  };

  useEffect(() => {
    scrollToBottom("messages");
  }, [isDragActive]);

  return (
    <div
      id="messages"
      className="messages__messages scroll b-shadow"
      {...getRootProps()}
    >
      {activeTeam.name !== "contacts"
        ? teamsMessages[activeTeam.name].map(
            ({ origin, message, date, file }, idx) =>
              message.length !== 0 ? (
                <>
                  {pendingMessage(date) && (
                    <>
                      <span
                        data-tip
                        data-for="pending"
                        className={`pending span__${
                          origin === "from" ? "from" : "to"
                        }`}
                        onMouseOver={() => setMouseOver(true)}
                        onMouseLeave={() => setMouseOver(false)}
                        onClick={() =>
                          dispatch({
                            type: types.removeMessage,
                            payload: { origin, date, message, file },
                          })
                        }
                      >
                        {mouseOver ? (
                          <>
                            Cancel <i className="fas fa-times"></i>
                          </>
                        ) : (
                          <>
                            Pending Message{" "}
                            <i className="fas fa-info-circle"></i>
                          </>
                        )}
                      </span>
                      <ReactTooltip id="pending" type="warning" effect="solid">
                        <span>{distanceFormat(date)}</span>
                      </ReactTooltip>
                    </>
                  )}
                  <p
                    key={idx}
                    className={`message__${origin === "from" ? "from" : "to"}`}
                  >
                    {message}
                  </p>
                  <span
                    className={`span__${origin === "from" ? "from" : "to"}`}
                  >
                    {`${fns.format(
                      Date.parse(date),
                      `EEE MMM d p`
                    )}  -  ${activeTeam.name.toUpperCase()} - ${
                      activeContact.phone
                    }`}
                  </span>
                </>
              ) : (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
              )
          )
        : activeContact.messages.map(({ origin, message, date, file }, idx) =>
            message.length !== 0 ? (
              <>
                {pendingMessage(date) && (
                  <>
                    <span
                      data-tip
                      data-for="pending"
                      className={`pending span__${
                        origin === "from" ? "from" : "to"
                      }`}
                      onMouseOver={() => setMouseOver(true)}
                      onMouseLeave={() => setMouseOver(false)}
                      onClick={() =>
                        dispatch({
                          type: types.removeMessage,
                          payload: { origin, date, message, file },
                        })
                      }
                    >
                      {mouseOver ? (
                        <>
                          Cancel <i className="fas fa-times"></i>
                        </>
                      ) : (
                        <>
                          Pending Message <i className="fas fa-info-circle"></i>
                        </>
                      )}
                    </span>
                    <ReactTooltip id="pending" type="warning" effect="solid">
                      <span>{distanceFormat(date)}</span>
                    </ReactTooltip>
                  </>
                )}
                <p
                  key={idx}
                  className={`message__${origin === "from" ? "from" : "to"}`}
                >
                  {message}
                </p>
                <span className={`span__${origin === "from" ? "from" : "to"}`}>
                  {`${fns.format(
                    Date.parse(date),
                    `EEE MMM d p`
                  )}  - ${activeTeam.name.toUpperCase()} - ${
                    activeContact.phone
                  }`}
                </span>
              </>
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
