import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

const DrawerItem = ({ text, linkTo }) => (
  <ListItem button component={Link} to={linkTo}>
    <ListItemText primary={text} />
  </ListItem>
);

export default DrawerItem;
