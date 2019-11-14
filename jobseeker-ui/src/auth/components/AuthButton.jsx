import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 10,
    width: 150
  }
}));

function AuthButton(props) {
  const classes = useStyles();

  return (
    <Button variant="contained" className={classes.button} {...props}>
      {props.children}
    </Button>
  );
}

export default AuthButton;
