import React from "react";

export const Templates = () => {
  return (
    <div className="message__templates">
      <input type="text" placeholder="Search..." />

      <button>New Template</button>

      <ul className="b-shadow">
        <li>Follow Up</li>
        <li>Opt In</li>
        <li>Reminder</li>
        <li>Appointment</li>
        <li>Monthly Payment</li>
        <li>Renew</li>
        <li>Birthday</li>
      </ul>
    </div>
  );
};
