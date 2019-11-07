import React from "react";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";

const BasicListItem = props => (
  <ListItem divider onClick={props.onClick} button>
    {props.children}
  </ListItem>
);

BasicListItem.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default BasicListItem;
