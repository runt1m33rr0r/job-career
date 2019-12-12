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
  const [popupData, setPopupData] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentPage, setCurrentpage] = useState(0);

  const itemsPerPage = 1;
  const pagesCount = items.length / itemsPerPage;

  const getCurrentPage = () => {
    if (currentPage >= pagesCount) {
      return 0;
    }

    return currentPage;
  };

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

  useEffect(() => {
    if (popupItem) {
      const item = items.find(item => item.id === popupItem);
      setPopupData(item);
    }
  }, [items, popupItem]);

  return (
    <Paper className={classes.container}>
      {popupData && (
        <PopupItem
          isOpen={popupOpen}
          onClose={handlePopupClose}
          {...popupData}
        />
      )}
      {items.length > 0 && (
        <Fragment>
          <List>
            {items
              .slice(
                getCurrentPage() * itemsPerPage,
                getCurrentPage() * itemsPerPage + itemsPerPage
              )
              .map(i => (
                <ListItem
                  key={i.id}
                  handleClick={handlePopupOpen(i.id)}
                  item={i}
                />
              ))}
          </List>
          <div className={classes.paginationContainer}>
            <TablePagination
              component="nav"
              page={getCurrentPage()}
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
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.any.isRequired }))
    .isRequired
};

ItemsList.defaultProps = {
  items: []
};

export default ItemsList;
