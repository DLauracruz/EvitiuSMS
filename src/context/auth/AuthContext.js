import React, { createContext, useReducer, useState } from "react";
import { authReducer } from "./AuthReducer";

export const AuthContext = createContext();

const initialState = {
  logged: false,
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        authState,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
