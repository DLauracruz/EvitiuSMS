import React, { useContext } from "react";
import { ContactsContext } from "../../context/ContactsContext";

export const Info = () => {
  const { contactsState } = useContext(ContactsContext);
  const { activeContact, activeTeam } = contactsState;

  return (
    <div>
      <div className="info__container b-shadow">
        <div className="info__title">
          <img
            className="circle-img"
            src="https://picsum.photos/200/200"
            alt=""
          />
          <h3>{activeTeam === "contacts" ? activeContact.name : activeTeam}</h3>
        </div>

        {activeTeam === "contacts" && (
          <div className="info__basic">
            <span>
              <strong>Email:</strong> {activeContact.email}
            </span>
            <span>
              <strong>Phone:</strong> {activeContact.phone}
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
          <button>Show more...</button>
        </div>
      </div>
    </div>
  );
};
