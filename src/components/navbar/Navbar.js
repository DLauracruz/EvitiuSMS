import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SlidePanel } from "./SlidePanel";

export const Navbar = () => {
  const [activated, setActivated] = useState(false);

  return (
    <>
      <nav className="navbar__nav b-shadow">
        <img
          className="circle-img"
          src="https://picsum.photos/200/200"
          alt=""
        />

        <ul>
          <li>
            <NavLink activeClassName="navbar__selected-route" exact to="/chat">
              <i className="fa fa-comment"></i>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="navbar__selected-route" exact to="/users">
              <i className="fa fa-sticky-note"></i>
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="navbar__selected-route"
              exact
              to="/message"
            >
              <i className="fa fa-users"></i>
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="navbar__selected-route"
              exact
              to="/groups"
            >
              <i className="fas fa-layer-group"></i>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="navbar__selected-route" exact to="/admin">
              <i className="fa fa-user"></i>
            </NavLink>
          </li>
        </ul>

        <button onClick={() => setActivated(!activated)}>
          <i className={`fas fa-chevron-${!activated ? "right" : "left"}`}></i>
        </button>
      </nav>

      <SlidePanel activated={activated} />
    </>
  );
};
