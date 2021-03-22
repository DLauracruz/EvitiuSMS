import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { ContactsContext } from "../context/ContactsContext";
import { AuthRouter } from "./AuthRouter";
import { MainRouter } from "./MainRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { authState } = useContext(AuthContext);
  console.log(authState);

  return (
    <Router>
      <div>
        <Switch>
          {/* <PrivateRoute
            isAuthenticated={authState.logged}
            exact
            path="/"
            component={MainRouter}
          />
          <PublicRoute
            isAuthenticated={authState.logged}
            path="/auth"
            component={AuthRouter}
          /> */}
          <Route path="/auth" component={AuthRouter} />
          <Route path="/" component={MainRouter} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
