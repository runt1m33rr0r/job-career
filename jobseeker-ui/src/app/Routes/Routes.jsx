import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "../../home/Home";
import Register from "../../auth/Register";
import Login from "../../auth/Login";
import Notices from "../../notices/Notices";
import Applications from "../../applications/Applications";
import Search from "../../search/Search";
import Categories from "../../categories/Categories";
import Profile from "../../auth/Profile";

const Routes = ({ isLoggedIn }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/register">
      {isLoggedIn ? <Redirect to="/" /> : <Register />}
    </Route>
    <Route path="/login">{isLoggedIn ? <Redirect to="/" /> : <Login />}</Route>
    <Route path="/profile">
      {!isLoggedIn ? <Redirect to="/" /> : <Profile />}
    </Route>
    <Route path="/notices" component={Notices} />
    <Route path="/applications" component={Applications} />
    <Route path="/search" component={Search} />
    <Route path="/categories" component={Categories} />
  </Switch>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default Routes;
