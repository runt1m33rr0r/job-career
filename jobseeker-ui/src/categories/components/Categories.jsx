import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: 300,
    maxWidth: 500
  },
  title: {
    alignSelf: "center",
    marginTop: 5
  },
  formControl: {
    margin: theme.spacing(1)
  }
}));

function Categories() {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [categoryText, setCategoryText] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCategorChangeOpen, setIsCategoryChangeOpen] = useState(false);
  const [chosenCategory, setChosenCategory] = useState("");

  const handleCategoryTextChange = event => setCategoryText(event.target.value);
  const handleAddKeyword = () => {
    if (!categories.includes(categoryText)) {
      setCategories([...categories, categoryText]);
    }
  };

  const handleCategoryRemove = name => () =>
    setCategories(categories.filter(category => category !== name));

  const handleCategoryChange = () => {
    const index = categories.indexOf(chosenCategory);
    setCategories([
      ...categories.slice(0, index),
      newCategoryName,
      ...categories.slice(index + 1)
    ]);

    toggleCategoryChangeRequest();
  };

  const toggleCategoryChangeRequest = () =>
    setIsCategoryChangeOpen(!isCategorChangeOpen);

  const handleSetNewCategoryName = event =>
    setNewCategoryName(event.target.value);

  const requestCategoryChange = name => () => {
    toggleCategoryChangeRequest();
    setChosenCategory(name);
  };

  return (
    <Paper className={classes.container}>
      <Dialog open={isCategorChangeOpen} onClose={toggleCategoryChangeRequest}>
        <DialogTitle>Change category name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="new category name"
            fullWidth
            onChange={handleSetNewCategoryName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleCategoryChangeRequest} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCategoryChange} color="primary">
            Change
          </Button>
        </DialogActions>
      </Dialog>
      <Typography className={classes.title} variant="h6" gutterBottom>
        Edit categories
      </Typography>
      <Grid
        container
        alignItems="flex-end"
        spacing={1}
        className={classes.formControl}
      >
        <Grid item xs={8}>
          <TextField
            label="enter category name"
            margin="dense"
            onChange={handleCategoryTextChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={handleAddKeyword}>
            Add
          </Button>
        </Grid>
        <Grid container item xs={12} spacing={1}>
          {categories.map(category => (
            <Grid item key={category}>
              <Chip
                label={category}
                variant="outlined"
                onClick={requestCategoryChange(category)}
                onDelete={handleCategoryRemove(category)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Categories;
