import React from "react";
import { connect } from "react-redux";
import ApplicationModal from "./ApplicationModal";

const ApplicationModalContainer = props => (
  <ApplicationModal
    application={props.application ? props.application : props.item}
    {...props}
  />
);

const mapStateToProps = state => ({
  userType: state.auth.userType
});

export default connect(mapStateToProps, null)(ApplicationModalContainer);
