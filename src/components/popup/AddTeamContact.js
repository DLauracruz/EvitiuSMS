import React, { useContext, useRef, useState } from "react";

import Popup from "reactjs-popup";
import { ContactsContext } from "../../context/ContactsContext";
import { useToasts } from "react-toast-notifications";
import { types } from "../../context/contactsTypes";

export const AddTeamContact = ({ trigger }) => {
  const [searchContacts, setSearchContacts] = useState("");
  const [searchTeams, setSearchTeams] = useState("");
  const { addToast } = useToasts();
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { contacts, teams } = contactsState;
  const [sltdContacts, setSltdContacts] = useState([]);
  const [sltdTeams, setSltdTeams] = useState([]);

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  const selectedClass = (cond, array) => array.includes(cond);

  const searchContact = ({ target }) => {
    setSearchContacts(target.value);
  };

  const searchTeam = ({ target }) => {
    setSearchTeams(target.value);
  };

  const selected = (init, set, cond) => {
    if (init.includes(cond)) {
      set(init.filter((sel) => sel !== cond));
    } else {
      set([...init, cond]);
    }
  };

  const addTeamContacts = () => {
    if (sltdContacts.length > 0 && sltdTeams.length > 0) {
      sltdContacts.map((id) => {
        dispatch({
          type: types.addMultiTeamContacts,
          payload: {
            _id: id,
            teams: sltdTeams,
          },
        });
      });

      addToast(`User(s) added successfully to there teams.`, {
        appearance: "info",
      });

      setSltdContacts([]);
      setSltdTeams([]);
      setSearchContacts("");
      setSearchTeams("");
      closeTooltip();
    } else {
      addToast(
        `You need to select one or more contacts and teams to confirm.`,
        {
          appearance: "error",
        }
      );
    }
  };

  return (
    <Popup ref={ref} trigger={trigger} modal>
      {(close) => (
        <div className="popup__add-contact">
          <h4>Add Team Contact</h4>

          <div className="popup__add-contact-list">
            <input
              onChange={searchContact}
              value={searchContacts}
              type="text"
              placeholder="Search..."
            />
            <label>Contacts</label>
            <ul className="scroll">
              {contacts.map(
                (contact, idx) =>
                  contact.name
                    .toLowerCase()
                    .includes(searchContacts.toLowerCase()) && (
                    <li
                      onClick={() =>
                        selected(sltdContacts, setSltdContacts, contact._id)
                      }
                      className={`b-shadow ${
                        selectedClass(contact._id, sltdContacts) &&
                        "popup__add-team-selected"
                      }`}
                      key={idx}
                    >
                      <img
                        className="circle-img"
                        src="https://picsum.photos/200/200"
                      />
                      <div>
                        <span>{contact.name}</span>
                        <div className="popup_add-contact-teams">
                          {contact.teams.map(
                            (team, idx) =>
                              team !== "contacts" && (
                                <span key={idx}>{team}</span>
                              )
                          )}
                        </div>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>
          <div className="popup__add-contact-list">
            <input
              onChange={searchTeam}
              value={searchTeams}
              type="text"
              placeholder="Search..."
            />
            <label>Teams</label>
            <ul className="scroll">
              {teams.map(
                (team, idx) =>
                  team !== "contacts" &&
                  team.toLowerCase().includes(searchTeams.toLowerCase()) && (
                    <li
                      onClick={() => selected(sltdTeams, setSltdTeams, team)}
                      className={`b-shadow ${
                        selectedClass(team, sltdTeams) &&
                        "popup__add-team-selected"
                      }`}
                      key={idx}
                    >
                      <span>{team}</span>
                    </li>
                  )
              )}
            </ul>
          </div>

          <div className="popup__actions">
            <button onClick={addTeamContacts}>Confirm</button>
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </Popup>
  );
};
