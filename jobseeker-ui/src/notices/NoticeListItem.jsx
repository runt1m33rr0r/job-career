import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import BasicListItem from "../common/BasicListItem";

const NoticeListItem = ({ item, handleClick }) => (
  <BasicListItem onClick={handleClick}>
    <ListItemText primary={item.lastModified} />
    <ListItemText primary={item.title} />
    <ListItemText primary={item.company} />
    {item.closed && <ListItemText primary="closed" />}
  </BasicListItem>
);

NoticeListItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default NoticeListItem;
