import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import BasicListItem from "../../../shared/components/BasicListItem";
import { userTypes } from "../../../shared/constants";

const ApplicationListItem = ({ item, handleClick, userType }) => (
  <BasicListItem onClick={handleClick}>
    <ListItemText primary={item.lastModified} />
    <ListItemText primary={item.notice.title} />
    {userType !== userTypes.COMPANY && (
      <ListItemText primary={item.notice.company} />
    )}
    {item.notice.closed && <ListItemText primary="closed" />}
  </BasicListItem>
);

ApplicationListItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired
};

export default ApplicationListItem;
