import React from "react";
import { connect } from "react-redux";
import ApplicationNotice from "./ApplicationNotice";

const ApplicationNoticeContainer = props => (
  <ApplicationNotice notice={props.item} {...props} />
);

export default connect(null, null)(ApplicationNoticeContainer);
