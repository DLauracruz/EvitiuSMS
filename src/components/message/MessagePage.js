import React from "react";
import { Area } from "./Area";
import { SearchContacts } from "./SearchContacts";
import { Templates } from "./Templates";

export const MessagePage = () => {
  return (
    <div className="message__page animate__animated  animate__fadeIn">
      <Templates />
      <Area />
      <SearchContacts />
    </div>
  );
};
