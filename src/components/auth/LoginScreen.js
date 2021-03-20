import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import { ContactsContext } from "../../context/ContactsContext";
import { types } from "../../context/contactsTypes";
import { CONTACTS } from "../../service/contactsService";

import Swal from "sweetalert2";

export const LoginScreen = () => {
  const history = useHistory();
  const { dispatch } = useContext(ContactsContext);

  // const { login } = useContext(AuthContext);

  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  //   rememberme: false,
  // });

  // useEffect(() => {
  //   const email = localStorage.getItem("email");
  //   if (email) {
  //     setForm((form) => ({
  //       ...form,
  //       email,
  //       rememberme: true,
  //     }));
  //   }
  // }, []);

  // const onChange = ({ target }) => {
  //   const { name, value } = target;
  //   setForm({
  //     ...form,
  //     [name]: value,
  //   });
  // };

  // const onSubmit = async (ev) => {
  //   ev.preventDefault();

  //   form.rememberme
  //     ? localStorage.setItem("email", form.email)
  //     : localStorage.removeItem("email");

  //   const { email, password } = form;
  //   const ok = await login(email, password);

  //   if (!ok) {
  //     Swal.fire("Error", "Verifique el usuario y contraseña", "error");
  //   }
  // };

  // const todoOk = () => {
  //   return form.email.length > 0 && form.password.length > 0 ? true : false;
  // };

  const navigateToDashboard = async () => {
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
