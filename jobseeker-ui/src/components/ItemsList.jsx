import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import TablePagination from "@material-ui/core/TablePagination";
import PropTypes from "prop-types";

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

function ItemsList(props) {
  const classes = useStyles();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleEditorClose = () => setIsEditorOpen(false);
  const handleEditorOpen = () => setIsEditorOpen(true);

  const listItems = props.items.map(item => (
    <props.listItemElement
      key={item.id}
      item={item}
      handleClick={handleEditorOpen}
    />
  ));

  return (
    <Paper className={classes.container}>
      <props.editorElement
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

ItemsList.propTypes = {
  editorElement: PropTypes.element.isRequired,
  listItemElement: PropTypes.element.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ItemsList;
