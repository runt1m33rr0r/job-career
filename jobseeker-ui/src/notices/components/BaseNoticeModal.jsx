import React, { useState, Fragment } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ReactMarkdown from "react-markdown/with-html";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Input from "./Input";
import LargeModal from "../../shared/components/LargeModal";
import Button from "./NoticeModalButton";

const categories = ["category1", "category2", "category3"];

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
            {categories.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            InputProps={{ readOnly: true }}
            label={props.notice.company}
            margin="dense"
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
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  notice: PropTypes.object,
  onCategoryChange: PropTypes.func,
  onDescriptionChange: PropTypes.func
};

NoticeModal.defaultProps = {
  readOnly: true,
  onCategoryChange: () => null,
  onDescriptionChange: () => null,
  notice: { content: "" }
};

export default NoticeModal;
