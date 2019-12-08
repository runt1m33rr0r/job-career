import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ApplicationModal from "../ApplicationModal";
import ItemsList from "../../../shared/components/ItemsList";
import ApplicationListItem from "../ApplicationListItem";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300
  }
}));

function Applications(props) {
  const classes = useStyles();
  const [noticeFilter, setNoticeFilter] = useState(1);

  const handleFilterChange = event => setNoticeFilter(event.target.value);

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel>Notice filter</InputLabel>
        <Select value={noticeFilter} onChange={handleFilterChange}>
          {props.applications.map(application => (
            <MenuItem key={application.id} value={application.notice.id}>
              {application.notice.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ItemsList
        items={props.applications}
        popupElement={ApplicationModal}
        listItemElement={ApplicationListItem}
      />
    </div>
  );
}

Applications.propTypes = {
  applications: PropTypes.array.isRequired
};

export default Applications;
