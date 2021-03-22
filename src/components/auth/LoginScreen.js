import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";
import { CONTACTS } from "../../service/contactsService";

import { AuthContext } from "../../context/auth/AuthContext";

export const LoginScreen = () => {
  const history = useHistory();
  const { dispatch } = useContext(ContactsContext);
  const { dispatch: disAuth } = useContext(AuthContext);

  const navigateToDashboard = async (ev) => {
    ev.preventDefault();
    await dispatch({ type: types.addContacts, payload: CONTACTS });
    await dispatch({
      type: types.addTemplate,
      payload: {
        name: "Welcome message",
        message: "Hello everyone, how are you?",
      },
    });
    await dispatch({
      type: types.addTemplate,
      payload: {
        name: "Office department",
        message:
          "This is an emergency message to all members from office department...",
      },
    });
    await dispatch({
      type: types.addTeam,
      payload: { name: "contacts", phone: "5620192588" },
    });
    await dispatch({
      type: types.addTeam,
      payload: { name: "prod", phone: "5620192588" },
    });
    await dispatch({
      type: types.addTeam,
      payload: { name: "dev", phone: "5620192588" },
    });
    await dispatch({
      type: types.addTeam,
      payload: { name: "excel", phone: "5620192588" },
    });
    await dispatch({
      type: types.setActiveTeam,
      payload: { name: "contacts", phone: "5620192588" },
    });
    await dispatch({ type: types.setActiveContact, payload: CONTACTS[0] });
    await dispatch({ type: types.setActiveTemplate, payload: 0 });
    await disAuth({ type: types.logged, payload: true });
    history.push("/");
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={navigateToDashboard}>
        <input
          className="auth__input"
          autoComplete="off"
          type="text"
          placeholder="Email"
          name="email"
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
        />
        <button type="submit" className="btn btn-primary btn-block mt-5">
          Login
        </button>
        <hr />
        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link className="link" to="/auth/register">
          Create new account
        </Link>
      </form>
    </>
  );
};
