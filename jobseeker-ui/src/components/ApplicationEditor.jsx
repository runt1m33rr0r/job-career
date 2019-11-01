import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  noticeContainer: {
    padding: theme.spacing(3, 3)
  },
  description: {
    width: "100%"
  },
  button: {
    width: 100
  }
}));

function NoticeEditor(props) {
  const classes = useStyles();

  return (
    <Dialog
      open={props.isEditorOpen}
      onClose={props.onEditorClose}
      fullWidth={true}
      maxWidth="xl"
    >
      <DialogContent>
        <div className={classes.noticeContainer}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid
              container
              item
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <TextField label="job title" margin="dense" />
              </Grid>
              <Grid item>
                <TextField label="company name" margin="dense" />
              </Grid>
            </Grid>
            <Grid item className={classes.description}></Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              item
              spacing={3}
            >
              <Grid item>
                <Button className={classes.button} variant="contained">
                  Application details
                </Button>
              </Grid>
              <Grid item>
                <Button className={classes.button} variant="contained">
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
}

NoticeEditor.propTypes = {
  isEditorOpen: PropTypes.bool.isRequired,
  onEditorClose: PropTypes.func.isRequired
};

export default NoticeEditor;
