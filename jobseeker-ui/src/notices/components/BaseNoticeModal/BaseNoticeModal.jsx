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

  return (
    <LargeModal {...props}>
      <Grid container item justify="center" alignItems="center" spacing={3}>
        <Grid item>
          <TextField
            InputProps={{ readOnly: props.readOnly }}
            label="job title"
            margin="dense"
            value={props.notice.title}
            onChange={handleTitleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            InputProps={{ readOnly: props.readOnly }}
            select
            label="Select"
            className={classes.textField}
            value={props.notice.category}
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
            value={props.notice.company}
          />
        </Grid>
      </Grid>
      <Grid item className={classes.description}>
        {isEditing ? (
          <Input
            onChange={handleDescriptionChange}
            text={props.notice.content}
          />
        ) : (
          <div>
            <ReactMarkdown source={props.notice.content} escapeHtml={false} />
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
        <Button onClick={props.onClose} text="Back" />
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
  notice: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired
  }).isRequired,
  readOnly: PropTypes.bool
};

NoticeModal.defaultProps = {
  readOnly: true,
  onCategoryChange: () => null,
  onDescriptionChange: () => null,
  onTitleChange: () => null,
  notice: { content: "" }
};

export default NoticeModal;
