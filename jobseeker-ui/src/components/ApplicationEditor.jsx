import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Editor from "./Editor";

const useStyles = makeStyles(theme => ({
  description: {
    width: "100%",
    height: "100%"
  }
}));

function NoticeEditor(props) {
  const classes = useStyles();

  return (
    <Editor {...props}>
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
          <Button variant="contained">Application details</Button>
        </Grid>
        <Grid item>
          <Button variant="contained">Delete</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={props.onEditorClose}>
            Back
          </Button>
        </Grid>
      </Grid>
    </Editor>
  );
}

export default NoticeEditor;
