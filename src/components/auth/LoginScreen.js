import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";
import { CONTACTS } from "../../service/contactsService";

export const LoginScreen = () => {
  const history = useHistory();
  const { dispatch } = useContext(ContactsContext);

  const navigateToDashboard = async () => {
    await dispatch({ type: types.addContacts, payload: CONTACTS });
    await dispatch({ type: types.addTeam, payload: "contacts" });
    await dispatch({ type: types.addTeam, payload: "prod" });
    await dispatch({ type: types.addTeam, payload: "dev" });
    await dispatch({ type: types.addTeam, payload: "excel" });
    await dispatch({ type: types.setActiveContact, payload: CONTACTS[0] });
    await dispatch({ type: types.setActiveTeam, payload: "contacts" });
    history.push("/");
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form>
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
        <button
          onClick={navigateToDashboard}
          className="btn btn-primary btn-block mt-5"
          type="submit"
        >
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
