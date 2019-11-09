import React from "react";
import TextField from "@material-ui/core/TextField";

const AuthTextField = props => (
  <TextField fullWidth required margin="dense" {...props} />
);

export default AuthTextField;
