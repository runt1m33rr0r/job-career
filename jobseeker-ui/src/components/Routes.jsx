import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Notices from "./Notices";
import Applications from "./Applications";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/notices" component={Notices} />
    <Route path="/applications" component={Applications} />
  </Switch>
);

export default Routes;
