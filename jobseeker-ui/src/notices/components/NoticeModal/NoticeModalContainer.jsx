import React from "react";
import { connect } from "react-redux";
import NoticeModal from "./NoticeModal";
import {
  editNoticeRequest,
  deleteNoticeRequest,
  createNoticeRequest
} from "../../data/noticesSlice";

const NoticeModalContainer = props => <NoticeModal {...props} />;

const mapStateToProps = state => ({
  userType: state.auth.userType,
  companyName: state.auth.companyName,
  token: state.auth.token,
  isFetching: state.network.isFetching,
  categories: state.categories.categories
});

const mapDispatchToProps = {
  editNoticeRequest,
  deleteNoticeRequest,
  createNoticeRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoticeModalContainer);
