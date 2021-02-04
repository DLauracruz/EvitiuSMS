import React, { useContext, useRef, useState } from "react";

import Popup from "reactjs-popup";
import { ContactsContext } from "../../context/ContactsContext";
import { useToasts } from "react-toast-notifications";
import { types } from "../../context/contactsTypes";
import * as Gen from "generator-username";
import { name } from "faker";

export const CreateTeam = ({ trigger }) => {
  const gerador = new Gen();

  const [search, setSearch] = useState("");
  const [sltdTeamName, setSltdTeamName] = useState("");
  const [teamNames, setTeamNames] = useState([]);
  const { addToast } = useToasts();
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { teams } = contactsState;

  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  const selectedClass = (cond, array) => array.includes(cond);

  const createTeam = () => {
    if (search.length > 2) {
      dispatch({ type: types.addTeam, payload: search });
      addToast(`Team '${search}' was added successfully.`, {
        appearance: "success",
      });
      setSltdTeamName("");
      setTeamNames([]);
      setSearch("");
      closeTooltip();
    } else {
      addToast(`You need to write a team name greater than 3 characters.`, {
        appearance: "error",
      });
    }
  };

  const searchTeam = ({ target }) => {
    console.log(target.value);
    setSearch(target.value);

    const tense = `${
      target.value
    } ${name.jobArea()} ${name.jobArea()} ${name.jobArea()} ${name.jobArea()} ${name.jobArea()}`;
    gerador.setNome(tense);

    setTeamNames([
      gerador.gerar(),
      gerador.gerar(),
      gerador.gerar(),
      gerador.gerar(),
      gerador.gerar(),
    ]);
  };

  return (
    <Popup ref={ref} trigger={trigger} modal>
      {(close) => (
        <div className="popup__team">
          <h4>Create Team</h4>

          <div className="popup__team-suggest">
            <input
              onChange={searchTeam}
              value={search}
              type="text"
              placeholder="Search..."
            />

            <label>Name Suggestions</label>

            <ul className="scroll">
              {teamNames.map((teamName, idx) => {
                return (
                  search.length >= 3 && (
                    <li
                      onClick={() => {
                        setSltdTeamName(teamName);
                        setSearch(teamName);
                      }}
                      className={`b-shadow ${
                        selectedClass(teamName, sltdTeamName) &&
                        "popup__team-name-selected"
                      }`}
                      key={idx}
                    >
                      {teamName}
                    </li>
                  )
                );
              })}
            </ul>
          </div>

          <div className="popup__team-teams">
            <label>Current Teams</label>

            <ul className="popup__team-list scroll">
              {teams.map((team, idx) => (
                <li
                  className={`b-shadow ${
                    team.toLowerCase() === search.toLowerCase()
                      ? "existing"
                      : team.toLowerCase().includes(search.toLowerCase()) &&
                        search.length > 0
                      ? "similar"
                      : "other"
                  }`}
                  key={idx}
                >
                  <span>{team}</span>
                </li>
              ))}
            </ul>

            <div className="popup__team-legends">
              <span>
                Existing Group <i className="fa fa-square"></i>
              </span>
              <span>
                Similar Group <i className="fa fa-square"></i>
              </span>
              <span>
                Other <i className="fa fa-square"></i>
              </span>
            </div>
          </div>

          <div className="popup__actions">
            <button onClick={createTeam}>Confirm</button>
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </Popup>
  );
};
