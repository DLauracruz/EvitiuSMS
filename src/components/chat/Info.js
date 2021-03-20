import React, { useContext } from "react";
import { useHistory } from "react-router";
import { ContactsContext } from "../../context/ContactsContext";
import { Groups } from "../popup/Groups";
import { Media } from "../popup/Media";

export const Info = () => {
  const { contactsState } = useContext(ContactsContext);
  const { activeContact, activeTeam } = contactsState;

  const history = useHistory();

  return (
    <div>
      <div className="info__container b-shadow scroll">
        <div className="info__title">
          <img
            className="circle-img"
            src="https://picsum.photos/200/200"
            alt=""
          />
          <h3>
            {activeTeam.name === "contacts"
              ? activeContact.name
              : activeTeam.name}
          </h3>
        </div>

        {activeTeam.name === "contacts" ? (
          <div className="info__basic">
            <span>
              <strong>Email:</strong> {activeContact.email}
            </span>
            <span>
              <strong>Phone:</strong> {activeContact.phone}
            </span>
          </div>
        ) : (
          <div className="info__basic">
            <span>
              <strong>Phone:</strong> {activeTeam.phone}
            </span>
          </div>
        )}
      </div>

      <div className="info__container b-shadow">
        <div className="info__subtitle">
          <h5>
            Tags <i className="fas fa-tags"></i>
          </h5>
        </div>

        <ul className="info__tags">
          <li>
            <i className="fas fa-tag"></i>Follow
          </li>
          <li>
            <i className="fas fa-tag"></i>Subscribe
          </li>
          <li>
            <i className="fas fa-tag"></i>Sold
          </li>
          <li>
            <i className="fas fa-tag"></i>New Customer
          </li>
        </ul>
      </div>

      <div className="info__container b-shadow">
        <div className="info__subtitle">
          <h5>
            Media <i className="fas fa-image"></i>
          </h5>
        </div>

        <div className="info__media">
          {activeContact?.messages.map(
            ({ message, file }, idx) =>
              message.length === 0 && (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
              )
          )}
          <Media trigger={<button>Show more...</button>} />
        </div>
      </div>

      <div className="info__container b-shadow">
        <div className="info__subtitle">
          <h5>
            Notes <i className="fas fa-sticky-note"></i>
          </h5>
          <span onClick={() => history.push("/users")}>
            See all <i className="fas fa-chevron-right"></i>
          </span>
        </div>

        <ul className="info__notes">
          {activeContact.notes.map((note) => (
            <li>{note}</li>
          ))}
        </ul>
      </div>

      <div className="info__container b-shadow">
        <div className="info__subtitle">
          <h5>
            Groups <i className="fas fa-user-friends"></i>
          </h5>
          <Groups
            trigger={
              <span>
                See all <i className="fas fa-chevron-right"></i>
              </span>
            }
          />
        </div>

        <ul className="info__groups">
          {activeContact.teams.map((team, idx) => (
            <li key={idx}>{team.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
