import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import BasicListItem from "../../../shared/components/BasicListItem";
import { userTypes } from "../../../shared/constants";

const NoticeListItem = ({
  handleClick,
  item: { closed, lastModified, title, company },
  userType,
  companyName
}) => (
  <BasicListItem onClick={handleClick}>
    <ListItemText primary={lastModified} />
    <ListItemText primary={title} />
    {(userType !== userTypes.COMPANY || company !== companyName) && (
      <ListItemText primary={company} />
    )}
    {closed && <ListItemText primary="closed" />}
  </BasicListItem>
);

NoticeListItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    closed: PropTypes.bool.isRequired,
    lastModified: PropTypes.string.isRequired
  }).isRequired,
  userType: PropTypes.string.isRequired,
  companyName: PropTypes.string
};

export default NoticeListItem;
