import React from "react";
import PropTypes from "prop-types";
import ApprovalNotice from "../ApprovalNotice";
import ApplicationNotice from "../ApplicationNotice";
import EditNotice from "../EditNotice";
import NoticeListItem from "../NoticeListItem";
import ItemsList from "../../../shared/components/ItemsList";
import { userTypes } from "../../../shared/constants";

function Notices({ userType, notices }) {
  let noticeElement = ApplicationNotice;
  if (userType === userTypes.ADMIN) {
    noticeElement = ApprovalNotice;
  } else if (userType === userTypes.COMPANY) {
    noticeElement = EditNotice;
  }

  return (
    <ItemsList
      items={notices}
      popupElement={noticeElement}
      listItemElement={NoticeListItem}
    />
  );
}

Notices.propTypes = {
  userType: PropTypes.string.isRequired,
  notices: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Notices;
