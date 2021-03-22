import React, { createContext, useReducer } from "react";
import { contactsReducer } from "./contactsReducer";

export const ContactsContext = createContext();

const initialState = {
  activeContact: null, // Objeto del usuario actual
  contacts: [], // Todos los usuarios de la BD
  teams: [],
  templates: [],
  groups: [],
  teamsMessages: {},
  activeTeam: null,
  activeFilter: "all",
  activeTemplate: 0,
  goBack: false,
};

export const ContactsProvider = ({ children }) => {
  const [contactsState, dispatch] = useReducer(contactsReducer, initialState);

  return (
    <ContactsContext.Provider value={{ contactsState, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
};
