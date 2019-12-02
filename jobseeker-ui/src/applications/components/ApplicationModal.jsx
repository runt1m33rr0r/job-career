import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LargeModal from "../../shared/components/LargeModal";
import NoticeModal from "../../notices/components/NoticeModal";
import { noticeModes } from "../../shared/constants";

const useStyles = makeStyles(() => ({
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
      <NoticeModal
        mode={noticeModes.VIEW}
        isOpen={isJobDetailsOpen}
        onClose={handleJobDetailsClose}
      />
      <Grid container item justify="center" alignItems="center" spacing={3}>
        <Grid container item xs={12} spacing={3} justify="center">
          <Grid item>
            <Typography variant="h6" gutterBottom>
              job title
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              company name
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3} justify="center">
          <Grid item>
            <Typography variant="h6" gutterBottom>
              first name
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              last name
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <TextField label="phone number" margin="dense" />
        </Grid>
        <Grid item>
          <TextField label="e-mail" margin="dense" />
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
          <Button variant="contained">Send</Button>
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
