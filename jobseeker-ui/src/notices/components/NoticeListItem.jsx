import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import BasicListItem from "../../shared/components/BasicListItem";

const NoticeListItem = ({
  handleClick,
  item: { title, company, closed, lastModified }
}) => (
  <BasicListItem onClick={handleClick}>
    <ListItemText primary={lastModified} />
    <ListItemText primary={title} />
    <ListItemText primary={company} />
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
  }).isRequired
};

export default NoticeListItem;
