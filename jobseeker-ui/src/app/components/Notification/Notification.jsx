import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: theme.palette.primary.dark
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    marginRight: theme.spacing(0.5)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

function Notification({ success, message, disableMessage }) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    disableMessage();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={message !== null && message.length > 0}
      onClose={handleClose}
    >
      <SnackbarContent
        className={success ? classes.success : classes.error}
        message={
          <span className={classes.message}>
            {success ? (
              <CheckCircleIcon className={classes.icon} />
            ) : (
              <ErrorIcon className={classes.icon} />
            )}
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            color="inherit"
            className={classes.icon}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
}

export default Notification;
