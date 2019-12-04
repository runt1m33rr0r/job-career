import React, { useEffect } from "react";
import { connect } from "react-redux";
import Notices from "./Notices";
import { getCompanyNoticesRequest } from "../../data/noticesSlice";

function NoticesContainer(props) {
  const { getCompanyNoticesRequest } = props;

  useEffect(() => {
    getCompanyNoticesRequest();
  }, [getCompanyNoticesRequest]);

  return <Notices {...props} />;
}

const mapDispatchToProps = { getCompanyNoticesRequest };

const mapStateToProps = state => ({
  notices: state.notices.notices,
  ...state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(NoticesContainer);
