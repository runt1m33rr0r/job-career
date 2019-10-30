import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "./AuthTextField";

function AuthSelectMenu(props) {
  const [userType, setUserType] = React.useState("Person");

  const handleUserTypeChange = event => {
    setUserType(event.target.value);

    if (props.onUserTypeChange) {
      props.onUserTypeChange(event.target.value);
    }
  };

  return (
    <TextField
      select
      label="Select user type"
      value={userType}
      onChange={handleUserTypeChange}
    >
      {props.userTypes.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default AuthSelectMenu;
