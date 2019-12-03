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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(props.items[0]);
  const ListItem = props.listItemElement;
  const PopupItem = props.popupElement;

  const handlePopupClose = () => setIsPopupOpen(false);
  const handlePopupOpen = item => () => {
    setIsPopupOpen(true);
    setSelectedItem(item);
  };

  const listItems = props.items.map(i => (
    <ListItem key={i.id} item={i} handleClick={handlePopupOpen(i)} />
  ));

  return (
    <Paper className={classes.container}>
      <PopupItem
        item={selectedItem}
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
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
  popupElement: PropTypes.any.isRequired,
  listItemElement: PropTypes.any.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ItemsList;
