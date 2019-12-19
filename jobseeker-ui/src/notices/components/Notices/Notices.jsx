import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ItemsList from "../../../shared/components/ItemsList";
import NoticeListItem from "../NoticeListItem";
import NoticeModal from "../NoticeModal";

function Notices({
  keywords,
  statuses,
  showCompanyNotices,
  notices,
  getCompanyNoticesRequest,
  getNoticesRequest,
  getAllCategoriesRequest,
  isFetching
}) {
  useEffect(() => {
    getAllCategoriesRequest();

    if (showCompanyNotices) {
      getCompanyNoticesRequest();
    } else {
      getNoticesRequest({ statuses, keywords });
    }
  }, [
    getCompanyNoticesRequest,
    getAllCategoriesRequest,
    getNoticesRequest,
    showCompanyNotices,
    statuses,
    keywords
  ]);

  if (notices.length === 0) {
    if (isFetching) {
      return null;
    }

    return (
      <Typography variant="h3" gutterBottom>
        You don't have any notices!
      </Typography>
    );
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
  isFetching: PropTypes.bool.isRequired,
  statuses: PropTypes.arrayOf(PropTypes.string),
  showCompanyNotices: PropTypes.bool
};

Notices.defaultProps = {
  keywords: [],
  statuses: []
};

export default Notices;
