import React from "react";
import ReactDOM from "react-dom";

import { ToastProvider } from "react-toast-notifications";
import { ContactsProvider } from "./context/ContactsContext";
import { SmsApp } from "./SmsApp";

import "./styles/styles.scss";

ReactDOM.render(
  <ContactsProvider>
    <ToastProvider autoDismiss autoDismissTimeout={6000}>
      <SmsApp />
    </ToastProvider>
  </ContactsProvider>,
  document.getElementById("root")
);
