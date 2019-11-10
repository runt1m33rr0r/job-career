import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import TextField from "./AuthTextField";
import { userTypes } from "../common/constants";

const AuthSelectMenu = props => (
  <TextField
    name={props.name}
    select
    label="Select user type"
    value={props.userType}
    onChange={props.onChange}
  >
    {userTypes.map(option => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
);

AuthSelectMenu.propTypes = {
  name: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AuthSelectMenu;
