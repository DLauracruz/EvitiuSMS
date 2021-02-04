import React from "react";
import { Chat } from "./Chat";
import { Contacts } from "./Contacts";
import { Info } from "./Info";

export const ChatPage = () => {
  return (
    <div className="chat__page animate__animated  animate__fadeIn">
      <Info />
      <Chat />
      <Contacts />
    </div>
  );
};
