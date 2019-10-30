import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Notice from "./Notice";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/notices" component={Notice} />
  </Switch>
);

export default Routes;
