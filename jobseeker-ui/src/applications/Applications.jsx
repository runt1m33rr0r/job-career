import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import ApplicationModal from "./ApplicationModal";
import ItemsList from "../common/ItemsList";
import ApplicationListItem from "./ApplicationListItem";

const applications = [
  {
    id: 1,
    phone: "some phone",
    eMail: "some mail",
    letter: "some letter",
    firstName: "first name",
    lastName: "last name",
    lastModified: "some date",
    notice: {
      id: 1,
      title: "some title",
      category: "some category",
      company: "some company",
      content: "some content",
      closed: false,
      lastModified: "some date"
    }
  },
  {
    id: 2,
    phone: "some phone",
    eMail: "some mail",
    letter: "some letter",
    firstName: "first name",
    lastName: "last name",
    lastModified: "some date",
    notice: {
      id: 2,
      title: "some title2",
      category: "some category",
      company: "some company",
      content: "some content",
      closed: false,
      lastModified: "some date"
    }
  }
];

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

function Applications() {
  const classes = useStyles();
  const [noticeFilter, setNoticeFilter] = useState(1);

  const handleFilterChange = event => setNoticeFilter(event.target.value);

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel>Notice filter</InputLabel>
        <Select value={noticeFilter} onChange={handleFilterChange}>
          {applications.map(application => (
            <MenuItem key={application.id} value={application.notice.id}>
              {application.notice.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ItemsList
        items={applications}
        popupElement={ApplicationModal}
        listItemElement={ApplicationListItem}
      />
    </div>
  );
}

export default Applications;
