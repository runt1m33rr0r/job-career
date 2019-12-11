import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "../../../home/components/Home";
import Register from "../../../auth/components/Register";
import Login from "../../../auth/components/Login";
import Applications from "../../../applications/components/Applications";
import Search from "../../../search/components/Search";
import Categories from "../../../categories/components/Categories";
import Profile from "../../../auth/components/Profile";
import Notices from "../../../notices/components/Notices";
import { userTypes } from "../../../shared/constants";

const Routes = ({ isLoggedIn, userType }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/register">
      {isLoggedIn ? <Redirect to="/" /> : <Register />}
    </Route>
    <Route path="/login">{isLoggedIn ? <Redirect to="/" /> : <Login />}</Route>
    <Route path="/profile">
      {!isLoggedIn ? <Redirect to="/" /> : <Profile />}
    </Route>
    <Route path="/notices/mine">
      {userType === userTypes.COMPANY && <Notices showCompanyNotices={true} />}
      {userType === userTypes.ADMIN && <Notices approved={false} />}
      {userType === userTypes.USER && <Notices approved={true} keywords={[]} />}
    </Route>
    <Route path="/notices" component={Notices} />
    <Route path="/applications" component={Applications} />
    <Route path="/search" component={Search} />
    <Route path="/categories" component={Categories} />
  </Switch>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired
};

export default Routes;
