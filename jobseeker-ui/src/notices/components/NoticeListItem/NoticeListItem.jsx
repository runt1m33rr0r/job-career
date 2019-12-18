import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import BasicListItem from "../../../shared/components/BasicListItem";
import { userTypes, noticeStatuses } from "../../../shared/constants";

const NoticeListItem = ({
  handleClick,
  item: { status, lastModified, title, company },
  userType,
  companyName
}) => (
  <BasicListItem onClick={handleClick}>
    <ListItemText primary={lastModified} />
    <ListItemText primary={title} />
    {(userType !== userTypes.COMPANY || company.name !== companyName) && (
      <ListItemText primary={company.name} />
    )}
    {status === noticeStatuses.CLOSED && <ListItemText primary="closed" />}
  </BasicListItem>
);

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
