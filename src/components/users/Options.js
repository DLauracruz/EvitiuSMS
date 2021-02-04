import React from "react";

export const Options = () => {
  return (
    <div className="notes__opt">
      <button>
        <i className="fas fa-user-edit"></i> Edit Customer
      </button>
      <button>
        <i className="fas fa-user-lock"></i> Block Customer
      </button>

      <div className="notes__actions">
        <button className="action">
          <label>Subscribed?</label>
          <i className="fas fa-coins"></i>
        </button>
        <button className="action">
          <label>Resend Invitation</label>
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </div>

      <div className="notes__container b-shadow">
        <div className="notes__subtitle">
          <h5>
            Tags <i className="fas fa-tags"></i>
          </h5>
        </div>

        <ul className="notes__tags">
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
    </div>
  );
};
