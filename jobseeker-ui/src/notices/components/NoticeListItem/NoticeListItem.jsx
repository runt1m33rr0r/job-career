import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import BasicListItem from "../../../shared/components/BasicListItem";
import { userTypes, noticeStatuses } from "../../../shared/constants";

function NoticeListItem({
  handleClick,
  item: { status, lastModified, title, company },
  userType,
  companyName
}) {
  const noticeBelongsToCompany =
    userType === userTypes.COMPANY && company.name === companyName;

  let noticeStatus;
  if (userType === userTypes.ADMIN || noticeBelongsToCompany) {
    if (status === noticeStatuses.CLOSED) {
      noticeStatus = <ListItemText primary="closed" />;
    } else if (status === noticeStatuses.OPEN) {
      noticeStatus = <ListItemText primary="approved" />;
    } else if (status === noticeStatuses.DENIED) {
      noticeStatus = <ListItemText primary="denied" />;
    } else if (status === noticeStatuses.PENDING) {
      noticeStatus = <ListItemText primary="pending" />;
    }
  }

  return (
    <BasicListItem onClick={handleClick}>
      <ListItemText primary={lastModified} />
      <ListItemText primary={title} />
      {!noticeBelongsToCompany && <ListItemText primary={company.name} />}
      {noticeStatus}
    </BasicListItem>
  );
}

NoticeListItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    lastModified: PropTypes.string.isRequired
  }).isRequired,
  userType: PropTypes.string.isRequired,
  companyName: PropTypes.string
};

export default NoticeListItem;
