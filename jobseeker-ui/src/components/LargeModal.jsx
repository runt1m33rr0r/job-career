import React from "react";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3, 3)
  }
}));

function LargeModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth="xl"
      fullScreen={fullScreen}
    >
      <DialogContent>
        <div className={classes.container}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            {props.children}
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
}

LargeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default LargeModal;
