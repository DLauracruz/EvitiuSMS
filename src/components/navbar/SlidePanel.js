import React, { useEffect } from "react";
import { AddTeamContact } from "../popup/AddTeamContact";
import { AddUser } from "../popup/AddUser";
import { CreateTeam } from "../popup/CreateTeam";
import { RemoveTeamContact } from "../popup/RemoveTeamContact";
import { SendMessage } from "../popup/SendMessage";

export const SlidePanel = ({ activated = false }) => {
  useEffect(() => {
    console.log(activated);
  }, [activated]);

  return (
    <div
      className={`chat__slide-panel b-shadow ${
        activated ? "open-menu" : "close-menu"
      }`}
    >
      <h3>Admin Configuration</h3>

      <div className="chat__side-info b-shadow">
        <span>
          <strong>Name:</strong> Diana Laura Cruz Cruz
        </span>
        <span>
          <strong>Role:</strong> Administrator
        </span>
        <span>
          <strong>Company:</strong> Evitiu
        </span>
      </div>

      <ul className="chat__slide-settings">
        <SendMessage
          trigger={
            <li>
              <i className="fa fa-plus"></i>
            </li>
          }
        />
        <AddUser
          trigger={
            <li>
              <i className="fa fa-user-plus"></i>
            </li>
          }
        />
        <CreateTeam
          trigger={
            <li>
              <i className="fas fa-chalkboard"></i>
            </li>
          }
        />
        <AddTeamContact
          trigger={
            <li>
              <i className="fas fa-users-cog"></i>
            </li>
          }
        />
        <RemoveTeamContact
          trigger={
            <li>
              <i className="fa fa-trash"></i>
            </li>
          }
        />
      </ul>
    </div>
  );
};
