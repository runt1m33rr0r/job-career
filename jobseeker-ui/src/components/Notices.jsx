import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TablePagination from "@material-ui/core/TablePagination";
import NoticeEditor from "./NoticeEditor";

const notices = [
  {
    id: 1,
    title: "some title",
    category: "category1",
    company: "some company",
    content: "# test",
    closed: false,
    approved: false,
    lastModified: "some date"
  },
  {
    id: 2,
    title: "some title",
    category: "category1",
    company: "some company",
    content: "# test",
    closed: false,
    approved: false,
    lastModified: "some date"
  },
  {
    id: 3,
    title: "some title",
    category: "category1",
    company: "some company",
    content: "# test",
    closed: false,
    approved: false,
    lastModified: "some date"
  }
];

const useStyles = makeStyles(() => ({
  container: {
    width: "90%",
    height: "80vh",
    display: "flex",
    flexDirection: "column"
  },
  paginationContainer: {
    alignSelf: "flex-end",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end"
  }
}));

function Notices() {
  const classes = useStyles();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleEditorClose = () => setIsEditorOpen(false);
  const handleEditorOpen = () => setIsEditorOpen(true);

  const listItems = notices.map(notice => (
    <ListItem key={notice.id} divider onClick={handleEditorOpen} button>
      <ListItemText primary={notice.lastModified} />
      <ListItemText primary={notice.title} />
      <ListItemText primary={notice.company} />
      <ListItemText primary={notice.closed ? "closed" : "open"} />
    </ListItem>
  ));

  return (
    <Paper className={classes.container}>
      <NoticeEditor
        isEditorOpen={isEditorOpen}
        onEditorClose={handleEditorClose}
      />
      <List>{listItems}</List>
      <div className={classes.paginationContainer}>
        <TablePagination
          component="nav"
          page={0}
          rowsPerPage={10}
          count={100}
          rowsPerPageOptions={[]}
          onChangePage={() => {}}
        />
      </div>
    </Paper>
  );
}

export default Notices;
