import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import TextField from "./AuthTextField";

const AuthSelectMenu = ({ name, userType, userTypes, onChange }) => (
  <TextField
    name={name}
    select
    label="Select user type"
    value={userType}
    onChange={onChange}
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
  onChange: PropTypes.func.isRequired,
  usertTypes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AuthSelectMenu;
