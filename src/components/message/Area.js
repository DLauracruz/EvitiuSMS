import React from "react";

export const Area = () => {
  return (
    <div className="message__area">
      <div className="message__header">
        <div className="message__user-info b-shadow">
          <img
            className="circle-img"
            src="https://picsum.photos/200/200"
            alt=""
          />
          <div>
            <h3>Follow Up</h3>
          </div>
        </div>
      </div>

      <textarea
        className="b-shadow"
        cols="30"
        rows="10"
        placeholder="Write Something..."
      ></textarea>
    </div>
  );
};
