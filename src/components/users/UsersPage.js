import React from "react";

import { Customers } from "./Customers";
import { Notes } from "./Notes";
import { Options } from "./Options";

export const UsersPage = () => {
  return (
    <div className="users__page animate__animated  animate__fadeIn">
      <Customers />
      <Notes />
      <Options />
    </div>
  );
};
