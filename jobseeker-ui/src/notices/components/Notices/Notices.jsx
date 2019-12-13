import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ItemsList from "../../../shared/components/ItemsList";
import NoticeListItem from "../NoticeListItem";
import NoticeModal from "../NoticeModal";

function Notices({
  userType,
  keywords,
  approved,
  closed,
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
      getNoticesRequest({ approved, closed, keywords });
    }
  }, [
    getCompanyNoticesRequest,
    getAllCategoriesRequest,
    getNoticesRequest,
    showCompanyNotices,
    approved,
    closed,
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
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCompanyNoticesRequest: PropTypes.func.isRequired,
  getNoticesRequest: PropTypes.func.isRequired,
  getAllCategoriesRequest: PropTypes.func.isRequired,
  approved: PropTypes.bool,
  closed: PropTypes.bool,
  showCompanyNotices: PropTypes.bool
};

Notices.defaultProps = {
  keywords: []
};

export default Notices;
