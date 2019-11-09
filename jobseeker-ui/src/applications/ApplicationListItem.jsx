import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import BasicListItem from "../common/BasicListItem";

const ApplicationListItem = ({ item, handleClick }) => (
  <BasicListItem onClick={handleClick}>
    <ListItemText primary={item.lastModified} />
    <ListItemText primary={item.notice.title} />
    <ListItemText primary={item.notice.company} />
    {item.notice.closed && <ListItemText primary="closed" />}
  </BasicListItem>
);

ApplicationListItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default ApplicationListItem;
