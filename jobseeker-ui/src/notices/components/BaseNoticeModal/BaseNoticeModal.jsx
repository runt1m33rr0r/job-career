import React, { useState, Fragment } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ReactMarkdown from "react-markdown/with-html";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../Input";
import LargeModal from "../../../shared/components/LargeModal";
import Button from "../NoticeModalButton";

const useStyles = makeStyles(() => ({
  description: {
    width: "100%"
  }
}));

function NoticeModal(props) {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(!props.readOnly);

  const handleCategoryChange = event =>
    props.onCategoryChange(event.target.value);
  const handleTitleChange = event => props.onTitleChange(event.target.value);
  const handleDescriptionChange = text => props.onDescriptionChange(text);
  const handleDescriptionButtonPress = () => setIsEditing(!isEditing);

  const handleClose = () => {
    setIsEditing(false);
    props.onClose();
  };

  if (props.categories.length === 0) {
    return null;
  }

  return (
    <LargeModal {...props} onClose={handleClose}>
      <Grid container item justify="center" alignItems="center" spacing={3}>
        <Grid item>
          <TextField
            InputProps={{ readOnly: props.readOnly }}
            label="Job title"
            margin="dense"
            value={props.title ? props.title : ""}
            onChange={handleTitleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            InputProps={{ readOnly: props.readOnly }}
            select
            label="Category"
            className={classes.textField}
            value={props.category}
            onChange={handleCategoryChange}
            margin="dense"
          >
            {props.categories.map(option => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            InputProps={{ readOnly: true }}
            label="Company name"
            margin="dense"
            value={props.company}
          />
        </Grid>
      </Grid>
      <Grid item className={classes.description}>
        {isEditing ? (
          <Input onChange={handleDescriptionChange} text={props.content} />
        ) : (
          <div>
            <ReactMarkdown source={props.content} escapeHtml={false} />
          </div>
        )}
      </Grid>
      <Grid container justify="center" alignItems="center" item spacing={3}>
        {!props.readOnly && (
          <Fragment>
            <Button
              onClick={handleDescriptionButtonPress}
              disabled={isEditing ? true : false}
              text="Edit"
            />
            <Button
              onClick={handleDescriptionButtonPress}
              disabled={!isEditing ? true : false}
              text="Preview"
            />
          </Fragment>
        )}
        {props.children}
        <Button onClick={handleClose} text="Back" />
      </Grid>
    </LargeModal>
  );
}

NoticeModal.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ).isRequired,
  category: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  company: PropTypes.string,
  readOnly: PropTypes.bool
};

NoticeModal.defaultProps = {
  onCategoryChange: () => null,
  onDescriptionChange: () => null,
  onTitleChange: () => null,
  content: ""
};

export default NoticeModal;
