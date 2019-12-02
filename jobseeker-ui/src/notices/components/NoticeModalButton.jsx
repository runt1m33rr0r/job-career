import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

export const useStyles = makeStyles(() => ({
  button: {
    width: 100
  }
}));

function NoticeModalButton(props) {
  const classes = useStyles();

  return (
    <Grid item>
      <Button className={classes.button} variant="contained" {...props}>
        {props.text}
      </Button>
    </Grid>
  );
}

NoticeModalButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default NoticeModalButton;
