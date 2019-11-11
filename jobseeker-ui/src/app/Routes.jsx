import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../home/Home";
import Register from "../auth/RegisterContainer";
import Login from "../auth/LoginContainer";
import Notices from "../notices/Notices";
import Applications from "../applications/Applications";
import Search from "../search/Search";
import Categories from "../categories/Categories";
import Profile from "../auth/Profile";

const Routes = ({ isLoggedIn }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/register">
      {isLoggedIn ? <Redirect to="/" /> : <Register />}
    </Route>
    <Route path="/login">{isLoggedIn ? <Redirect to="/" /> : <Login />}</Route>
    <Route path="/profile" component={Profile} />
    <Route path="/notices" component={Notices} />
    <Route path="/applications" component={Applications} />
    <Route path="/search" component={Search} />
    <Route path="/categories" component={Categories} />
  </Switch>
);

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Routes);
