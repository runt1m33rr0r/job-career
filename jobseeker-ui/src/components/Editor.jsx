import React from "react";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3, 3)
  }
}));

function Editor(props) {
  const classes = useStyles();

  return (
    <Dialog
      open={props.isEditorOpen}
      onClose={props.onEditorClose}
      fullWidth={true}
      maxWidth="xl"
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

Editor.propTypes = {
  isEditorOpen: PropTypes.bool.isRequired,
  onEditorClose: PropTypes.func.isRequired
};

export default Editor;
