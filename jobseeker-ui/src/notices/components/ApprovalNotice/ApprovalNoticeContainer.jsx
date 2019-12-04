import React from "react";
import { connect } from "react-redux";
import ApprovalNotice from "./ApprovalNotice";
import { editNoticeRequest } from "../../data/noticesSlice";

const ApplicationNoticeContainer = props => (
  <ApprovalNotice notice={props.item} {...props} />
);

const mapStateToProps = state => ({
  isFetching: state.network.isFetching
});

const mapDispatchToProps = { editNoticeRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationNoticeContainer);
