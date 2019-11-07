import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Notices from "./Notices";
import Applications from "./Applications";
import Search from "./Search";
import Categories from "./Categories";
import Profile from "./Auth/Profile";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/profile" component={Profile} />
    <Route path="/notices" component={Notices} />
    <Route path="/applications" component={Applications} />
    <Route path="/search" component={Search} />
    <Route path="/categories" component={Categories} />
  </Switch>
);

export default Routes;
