import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Register from "../../../auth/components/Register";
import Login from "../../../auth/components/Login";
import Applications from "../../../applications/components/Applications";
import Search from "../../../search/components/Search";
import Categories from "../../../categories/components/Categories";
import Profile from "../../../auth/components/Profile";
import Notices from "../../../notices/components/Notices";
import ForgottenPassword from "../../../auth/components/ForgottenPassword";
import { userTypes, noticeStatuses } from "../../../shared/constants";

function Routes({ isLoggedIn, userType }) {
  const history = useHistory();

  const getHistoryStatuses = () => {
    if (history.location.state) {
      if (history.location.state.statuses) {
        return history.location.state.statuses;
      }

      return [];
    }

    return [];
  };

  const getHistoryKeywords = () => {
    if (history.location.state) {
      if (history.location.state.keywords) {
        return history.location.state.keywords;
      }

      return [];
    }

    return [];
  };

  const getHistoryCategories = () => {
    if (history.location.state) {
      if (history.location.state.categories) {
        return history.location.state.categories;
      }

      return null;
    }

    return null;
  };

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/search" />
      </Route>
      <Route path="/register">
        {isLoggedIn ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route path="/login">
        {isLoggedIn ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/profile">
        {!isLoggedIn ? <Redirect to="/login" /> : <Profile />}
      </Route>
      <Route path="/forgotten" component={ForgottenPassword} />
      <Route path="/notices/mine">
        {!isLoggedIn && <Redirect to="/login" />}
        {userType === userTypes.COMPANY && (
          <Notices showCompanyNotices={true} />
        )}
        {userType === userTypes.ADMIN && (
          <Notices statuses={[noticeStatuses.PENDING]} keywords={[]} />
        )}
      </Route>
      <Route path="/notices">
        <Notices
          statuses={getHistoryStatuses()}
          keywords={getHistoryKeywords()}
          categories={getHistoryCategories()}
        />
      </Route>
      <Route path="/applications">
        {!isLoggedIn ? <Redirect to="/login" /> : <Applications />}
      </Route>
      <Route path="/search" component={Search} />
      <Route path="/categories">
        {!isLoggedIn ? <Redirect to="/login" /> : <Categories />}
      </Route>
    </Switch>
  );
}

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired
};

export default Routes;
