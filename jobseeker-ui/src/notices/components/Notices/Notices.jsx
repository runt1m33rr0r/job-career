import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ItemsList from "../../../shared/components/ItemsList";
import NoticeListItem from "../NoticeListItem";
import NoticeModal from "../NoticeModal";
import { userTypes } from "../../../shared/constants";

function Notices({
  userType,
  keywords,
  approved,
  showCompanyNotices,
  notices,
  getCompanyNoticesRequest,
  getNoticesRequest,
  getAllCategoriesRequest
}) {
  useEffect(() => {
    getAllCategoriesRequest();

    if (showCompanyNotices) {
      getCompanyNoticesRequest();
    } else {
      if (userType === userTypes.USER) {
        getNoticesRequest({ approved: true, keywords });
      } else {
        getNoticesRequest({ approved, keywords });
      }
    }
  }, [
    getCompanyNoticesRequest,
    getAllCategoriesRequest,
    getNoticesRequest,
    showCompanyNotices,
    approved,
    keywords,
    userType
  ]);

  if (notices.length === 0) {
    return null;
  }

  return (
    <ItemsList
      items={notices}
      popupElement={NoticeModal}
      listItemElement={NoticeListItem}
    />
  );
}

Notices.propTypes = {
  notices: PropTypes.arrayOf(PropTypes.object).isRequired,
  userType: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCompanyNoticesRequest: PropTypes.func.isRequired,
  getNoticesRequest: PropTypes.func.isRequired,
  getAllCategoriesRequest: PropTypes.func.isRequired,
  approved: PropTypes.bool,
  showCompanyNotices: PropTypes.bool
};

Notices.defaultProps = {
  keywords: []
};

export default Notices;
