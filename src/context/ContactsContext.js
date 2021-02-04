import React, { createContext, useReducer } from "react";
import { contactsReducer } from "./contactsReducer";

export const ContactsContext = createContext();

const initialState = {
  activeContact: {}, // Objeto del usuario actual
  contacts: [], // Todos los usuarios de la BD
  teams: [],
  teamsMessages: { contacts: [] },
  activeTeam: null,
  activeFilter: "all",
};

export const ContactsProvider = ({ children }) => {
  const [contactsState, dispatch] = useReducer(contactsReducer, initialState);

  return (
    <ContactsContext.Provider value={{ contactsState, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
};
