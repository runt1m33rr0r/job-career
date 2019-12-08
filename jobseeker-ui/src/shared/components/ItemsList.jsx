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
  const [popupItem, setPopupItem] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentPage, setCurrentpage] = useState(0);

  const itemsPerPage = 1;
  const pagesCount = items.length / itemsPerPage;

  const handlePopupClose = () => {
    setPopupOpen(false);
    setPopupItem(null);
  };

  const handlePopupOpen = item => () => setPopupItem(item);
  const handlePageChange = (event, newPage) => setCurrentpage(newPage);

  useEffect(() => {
    if (popupItem) {
      setPopupOpen(true);
    }
  }, [popupItem]);

  return (
    <Paper className={classes.container}>
      {popupItem && (
        <PopupItem
          isOpen={popupOpen}
          onClose={handlePopupClose}
          item={popupItem}
        />
      )}
      {items.length > 0 && (
        <Fragment>
          <List>
            {items
              .slice(
                currentPage * itemsPerPage,
                currentPage * itemsPerPage + itemsPerPage
              )
              .map(i => (
                <ListItem
                  key={i.id}
                  handleClick={handlePopupOpen(i)}
                  item={i}
                />
              ))}
          </List>
          <div className={classes.paginationContainer}>
            <TablePagination
              component="nav"
              page={currentPage}
              rowsPerPage={itemsPerPage}
              count={pagesCount}
              rowsPerPageOptions={[]}
              onChangePage={handlePageChange}
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
