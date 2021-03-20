import React from "react";
import ReactDOM from "react-dom";

import { ToastProvider } from "react-toast-notifications";
import { AuthProvider } from "./context/auth/AuthContext";
import { ContactsProvider } from "./context/ContactsContext";
import { SmsApp } from "./SmsApp";

import "./styles/styles.scss";

ReactDOM.render(
  <ContactsProvider>
    <AuthProvider>
      <ToastProvider autoDismiss autoDismissTimeout={6000}>
        <SmsApp />
      </ToastProvider>
    </AuthProvider>
  </ContactsProvider>,
  document.getElementById("root")
);
