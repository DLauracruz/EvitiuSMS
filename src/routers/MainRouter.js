import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Navbar } from "../components/navbar/Navbar";
import { ChatPage } from "../components/chat/ChatPage";
import { UsersPage } from "../components/users/UsersPage";
import { MessagePage } from "../components/message/MessagePage";
import { AdminPage } from "../components/admin/AdminPage";

export const MainRouter = () => {
  return (
    <div className="main__router">
      <Navbar />

      <div className="main__container">
        <Switch>
          <Route exact path="/chat" component={ChatPage} />
          <Route exact path="/users" component={UsersPage} />
          <Route exact path="/message" component={MessagePage} />
          <Route exact path="/admin" component={AdminPage} />

          <Redirect exact to="/chat" />
        </Switch>
      </div>
    </div>
  );
};
