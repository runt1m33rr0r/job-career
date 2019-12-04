import React from "react";
import { connect } from "react-redux";
import EditNotice from "./EditNotice";
import {
  editNoticeRequest,
  deleteNoticeRequest
} from "../../data/noticesSlice";

const EditNoticeContainer = props => (
  <EditNotice notice={props.item} {...props} />
);

const mapStateToProps = state => ({
  isFetching: state.network.isFetching
});

const mapDispatchToProps = { editNoticeRequest, deleteNoticeRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNoticeContainer);
