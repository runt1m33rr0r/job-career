import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { noticeStatuses } from "../../../shared/constants";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  formControl: {
    margin: theme.spacing(1),
    width: 400
  },
  searchButton: {
    alignSelf: "center",
    margin: 30
  },
  addKeywordButton: {
    marginLeft: 5
  }
}));

function Search(props) {
  const classes = useStyles();
  const history = useHistory();
  const [chosenCategories, setChosenCategories] = useState([]);
  const [noticeType, setNoticeType] = useState([
    noticeStatuses.OPEN,
    noticeStatuses.PENDING
  ]);
  const [keywords, setKeywords] = useState([]);
  const [keywordText, setKeywordText] = useState("");

  const handleCategoriesChange = event =>
    setChosenCategories(event.target.value);

  const handleNoticeTypeChange = event => setNoticeType(event.target.value);
  const handleKeywordTextChange = event => setKeywordText(event.target.value);
  const handleAddKeyword = () => {
    if (!keywords.includes(keywordText)) {
      setKeywords([...keywords, keywordText]);
    }
  };

  const handleKeywordRemove = name => event => {
    setKeywords(keywords.filter(keyword => keyword !== name));
  };

  const handleSearchPress = () => {
    history.push("/notices", {
      keywords,
      category: chosenCategories.length > 0 ? chosenCategories[0] : null,
      statuses: noticeType
    });
  };

  return (
    <Paper className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel>Choose job categories</InputLabel>
        <Select
          multiple
          value={chosenCategories}
          onChange={handleCategoriesChange}
          input={<Input />}
          renderValue={selected => selected.join(", ")}
        >
          {props.categories.map(category => (
            <MenuItem key={category.id} value={category.name}>
              <Checkbox
                checked={chosenCategories.indexOf(category.name) > -1}
                color="primary"
              />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid
        container
        alignItems="flex-end"
        spacing={1}
        className={classes.formControl}
      >
        <Grid item xs={6}>
          <TextField
            label="enter keyword"
            margin="dense"
            onChange={handleKeywordTextChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            className={classes.addKeywordButton}
            onClick={handleAddKeyword}
          >
            Add
          </Button>
        </Grid>
        <Grid container item xs={12} spacing={1}>
          {keywords.map(keyword => (
            <Grid item key={keyword}>
              <Chip
                label={keyword}
                variant="outlined"
                onDelete={handleKeywordRemove(keyword)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          name="noticeType"
          value={noticeType}
          onChange={handleNoticeTypeChange}
        >
          <FormControlLabel
            value={[noticeStatuses.OPEN]}
            control={<Radio color="primary" />}
            label="approved"
          />
          <FormControlLabel
            value={[noticeStatuses.PENDING]}
            control={<Radio color="primary" />}
            label="waiting for approval"
          />
          <FormControlLabel
            value={[noticeStatuses.OPEN, noticeStatuses.PENDING]}
            control={<Radio color="primary" />}
            label="both"
          />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        className={classes.searchButton}
        onClick={handleSearchPress}
      >
        Search
      </Button>
    </Paper>
  );
}

Search.propTypes = {
  categories: PropTypes.array.isRequired
};

Search.defaultProps = {
  categories: []
};

export default Search;
