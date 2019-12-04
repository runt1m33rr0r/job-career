import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import ApprovalNotice from "../ApprovalNotice";
import ApplicationNotice from "../ApplicationNotice";
import EditNotice from "../EditNotice";
import NoticeListItem from "../NoticeListItem";
import ItemsList from "../../../shared/components/ItemsList";
import { userTypes } from "../../../shared/constants";

function Notices({
  userType,
  notices,
  getCompanyNoticesRequest,
  getAllCategoriesRequest
}) {
  let noticeElement = ApplicationNotice;
  if (userType === userTypes.ADMIN) {
    noticeElement = ApprovalNotice;
  } else if (userType === userTypes.COMPANY) {
    noticeElement = EditNotice;
  }

  useEffect(() => {
    getCompanyNoticesRequest();
    getAllCategoriesRequest();
  }, [getCompanyNoticesRequest, getAllCategoriesRequest]);

  return (
    <Fragment>
      <ItemsList
        items={notices}
        popupElement={noticeElement}
        listItemElement={NoticeListItem}
      />
    </Fragment>
  );
}

Notices.propTypes = {
  userType: PropTypes.string.isRequired,
  notices: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCompanyNoticesRequest: PropTypes.func.isRequired,
  getAllCategoriesRequest: PropTypes.func.isRequired
};

export default Notices;
