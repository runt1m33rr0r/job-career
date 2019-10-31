import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DrawerItem = ({ text, linkTo }) => (
  <ListItem button component={Link} to={linkTo}>
    <ListItemText primary={text} />
  </ListItem>
);

DrawerItem.propTypes = {
  text: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired
};

export default DrawerItem;
