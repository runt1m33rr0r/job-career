import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import BasicListItem from "../../../shared/components/BasicListItem";
import { userTypes, noticeStatuses } from "../../../shared/constants";

function ApplicationListItem({ item, handleClick, userType, companyName }) {
  const noticeBelongsToCompany =
    userType === userTypes.COMPANY &&
    item.jobNotice.company.name === companyName;

  let noticeStatus;
  if (noticeBelongsToCompany) {
    if (item.jobNotice.status === noticeStatuses.CLOSED) {
      noticeStatus = <ListItemText primary="closed" />;
    } else if (item.jobNotice.status === noticeStatuses.OPEN) {
      noticeStatus = <ListItemText primary="approved" />;
    } else if (item.jobNotice.status === noticeStatuses.DENIED) {
      noticeStatus = <ListItemText primary="denied" />;
    } else if (item.jobNotice.status === noticeStatuses.PENDING) {
      noticeStatus = <ListItemText primary="pending" />;
    }
  }

  return (
    <BasicListItem onClick={handleClick}>
      <ListItemText primary={item.lastModified} />
      <ListItemText primary={item.jobNotice.title} />
      {!noticeBelongsToCompany && (
        <ListItemText primary={item.jobNotice.company.name} />
      )}
      {noticeStatus}
    </BasicListItem>
  );
}

ApplicationListItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired
};

ApplicationListItem.defaultProps = {
  companyName: ""
};

export default ApplicationListItem;
