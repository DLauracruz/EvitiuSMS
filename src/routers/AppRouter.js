import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { MainRouter } from "./MainRouter";
// import { PrivateRoute } from "./PrivateRoute";
// import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
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
    </HashRouter>
  );
};
