import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 200
  }
}));

function AuthForm(props) {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate autoComplete="off">
      {props.children}
    </form>
  );
}

export default AuthForm;
