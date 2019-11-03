import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import LargeModal from "./LargeModal";
import NoticeModal from "./NoticeModal";

const useStyles = makeStyles(theme => ({
  description: {
    width: "100%",
    height: "100%"
  }
}));

function ApplicationModal(props) {
  const classes = useStyles();
  const [isJobDetailsOpen, setIsJobDetails] = useState(false);

  const handleJobDetailsClose = () => setIsJobDetails(false);
  const handleJobDetailsOpen = () => setIsJobDetails(true);

  return (
    <LargeModal {...props}>
      <NoticeModal isOpen={isJobDetailsOpen} onClose={handleJobDetailsClose} />
      <Grid container item justify="center" alignItems="center" spacing={3}>
        <Grid item>
          <TextField label="job title" margin="dense" />
        </Grid>
        <Grid item>
          <TextField label="company name" margin="dense" />
        </Grid>
      </Grid>
      <Grid item className={classes.description}>
        <div className={classes.description}>
          <TextField
            fullWidth
            label="Motivational letter"
            multiline
            rows="20"
            defaultValue="some letter"
            margin="normal"
            variant="outlined"
          />
        </div>
      </Grid>
      <Grid container justify="center" alignItems="center" item spacing={3}>
        <Grid item>
          <Button variant="contained" onClick={handleJobDetailsOpen}>
            Job details
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained">Delete</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={props.onClose}>
            Back
          </Button>
        </Grid>
      </Grid>
    </LargeModal>
  );
}

export default ApplicationModal;
