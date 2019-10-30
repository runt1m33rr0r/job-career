import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown/with-html";
import Input from "./Input";

const categories = ["category1", "category2", "category3"];

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

function Notice() {
  const classes = useStyles();
  const [category, setCategory] = useState(categories[0]);
  const [markdown, setMarkdown] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const handleDescriptionChange = text => setMarkdown(text);
  const handleDescriptionButtonPress = () => setIsEditing(!isEditing);

  return (
    <Paper className={classes.noticeContainer}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid container justify="center" alignItems="center" item spacing={3}>
          <Grid item>
            <TextField label="job title" margin="dense" />
          </Grid>
          <Grid item>
            <TextField label="company name" margin="dense" />
          </Grid>
          <Grid item>
            <TextField
              select
              label="Select"
              className={classes.textField}
              value={category}
              onChange={handleCategoryChange}
              margin="dense"
            >
              {categories.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid item className={classes.description}>
          {isEditing ? (
            <Input onChange={handleDescriptionChange} text={markdown} />
          ) : (
            <div>
              <ReactMarkdown source={markdown} escapeHtml={false} />
            </div>
          )}
        </Grid>
        <Grid container justify="center" alignItems="center" item spacing={3}>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              onClick={handleDescriptionButtonPress}
              disabled={isEditing ? true : false}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              onClick={handleDescriptionButtonPress}
              disabled={!isEditing ? true : false}
            >
              Preview
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} variant="contained">
              Publish
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} variant="contained">
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} variant="contained">
              Open
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} variant="contained">
              Close
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} variant="contained">
              Approve
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} variant="contained">
              Disapprove
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Notice;
