import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { AuthRouter } from "./AuthRouter";
import { MainRouter } from "./MainRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { auth, verificaToken } = useContext(AuthContext);

  useEffect(() => {
    verificaToken();
  }, [verificaToken]);

  if (auth.checking) {
    return <h1>Espere por favor</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          {/* <PublicRoute
            isAuthenticated={auth.logged}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            isAuthenticated={auth.logged}
            exact
            path="/"
            component={MainRouter}
          /> */}
          <Route path="/auth" component={AuthRouter} />
          <Route path="/" component={MainRouter} />
        </Switch>
      </div>
    </Router>
  );
};
