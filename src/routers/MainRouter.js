import React, { useContext, useEffect } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import { Navbar } from "../components/navbar/Navbar";
import { ChatPage } from "../components/chat/ChatPage";
import { UsersPage } from "../components/users/UsersPage";
import { MessagePage } from "../components/message/MessagePage";
import { AdminPage } from "../components/admin/AdminPage";
import { GroupsPage } from "../components/groups/GroupsPage";
import { ContactsContext } from "../context/ContactsContext";
import { types } from "../context/contactsTypes";

export const MainRouter = () => {
  const { contactsState, dispatch } = useContext(ContactsContext);
  const { goBack } = contactsState;
  const history = useHistory();
  const location = useLocation();

  const back = () => {
    dispatch({ type: types.changeGoBack, payload: false });
    history.goBack();
  };
  const showBack = () => dispatch({ type: types.changeGoBack, payload: true });

  // useEffect(() => {
  //   console.log(location.pathname);
  //   if (location.pathname !== "/chat") {
  //     showBack();
  //   } else {
  //     dispatch({ type: types.changeGoBack, payload: false });
  //   }
  // }, [location.pathname]);

  return (
    <div className="main__router">
      <Navbar />

      {goBack && (
        <button onClick={back} className="main__back b-shadow">
          <i class="fas fa-arrow-left"></i> Back
        </button>
      )}

      <div className="main__container">
        <Switch>
          <Route exact path="/chat" component={ChatPage} />
          <Route exact path="/users" component={UsersPage} />
          <Route exact path="/message" component={MessagePage} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/groups" component={GroupsPage} />

          <Redirect exact to="/chat" />
        </Switch>
      </div>
    </div>
  );
};
