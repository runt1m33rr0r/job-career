import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import BasicListItem from "../../../shared/components/BasicListItem";
import { userTypes, noticeStatuses } from "../../../shared/constants";

const ApplicationListItem = ({ item, handleClick, userType }) => (
  <BasicListItem onClick={handleClick}>
    <ListItemText primary={item.lastModified} />
    <ListItemText primary={item.jobNotice.title} />
    {userType !== userTypes.COMPANY && (
      <ListItemText primary={item.jobNotice.company.name} />
    )}
    {item.jobNotice.status === noticeStatuses.CLOSED && (
      <ListItemText primary="closed" />
    )}
    {item.jobNotice.status === noticeStatuses.OPEN && (
      <ListItemText primary="approved" />
    )}
    {item.jobNotice.status === noticeStatuses.DENIED && (
      <ListItemText primary="denied" />
    )}
    {item.jobNotice.status === noticeStatuses.PENDING && (
      <ListItemText primary="pending" />
    )}
  </BasicListItem>
);

ApplicationListItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired
};

export default ApplicationListItem;
