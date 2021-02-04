import React from "react";

export const SearchContacts = () => {
  return (
    <div className="message__contact">
      <button>Edit Template</button>
      <button>Delete Template</button>

      <label>Send your SMS here! Search yur contact</label>
      <input type="text" placeholder="Search..." />

      <div className="message__badge">
        <div className="b-shadow message__name">
          <img
            className="circle-img"
            src="https://picsum.photos/200/200"
            alt=""
          />
          <span>Diana Laura Cruz Cruz</span>
          <i className=" fa fa-times"></i>
        </div>

        <i className="b-shadow fas fa-paper-plane"></i>
      </div>
    </div>
  );
};
