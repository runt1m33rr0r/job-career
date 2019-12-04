import React, { useState, Fragment, useEffect } from "react";
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
  const { items, listItemElement: ListItem, popupElement: PopupItem } = props;

  const classes = useStyles();
  const [popupItem, setPopupItem] = useState(items[0]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (popupItem) {
      setPopupOpen(true);
    }
  }, [popupItem]);

  const handlePopupClose = () => setPopupOpen(false);
  const handlePopupOpen = item => () => setPopupItem(item);

  return (
    <Paper className={classes.container}>
      {items.length > 0 && (
        <Fragment>
          {popupItem && (
            <PopupItem
              isOpen={popupOpen}
              onClose={handlePopupClose}
              item={popupItem}
            />
          )}
          <List>
            {items.map(i => (
              <ListItem key={i.id} handleClick={handlePopupOpen(i)} item={i} />
            ))}
          </List>
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
        </Fragment>
      )}
    </Paper>
  );
}

ItemsList.propTypes = {
  popupElement: PropTypes.any.isRequired,
  listItemElement: PropTypes.any.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

ItemsList.defaultProps = {
  items: []
};

export default ItemsList;
