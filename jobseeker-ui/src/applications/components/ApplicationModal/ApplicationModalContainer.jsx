import React from "react";
import { connect } from "react-redux";
import ApplicationModal from "./ApplicationModal";
import {
  createApplicationRequest,
  editApplicationRequest,
  deleteApplicationRequest
} from "../../data/applicationsSlice";

const ApplicationModalContainer = props => (
  <ApplicationModal
    application={props.application ? props.application : props.item}
    {...props}
  />
);

const mapStateToProps = state => ({
  userType: state.auth.userType,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
  candidateId: state.auth.userId
});

const mapDispatchToProps = {
  createApplicationRequest,
  editApplicationRequest,
  deleteApplicationRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationModalContainer);
