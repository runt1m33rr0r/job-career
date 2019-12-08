import React, { useState, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import LargeModal from "../../../shared/components/LargeModal";
import NoticeModal from "../../../notices/components/NoticeModal";
import { userTypes } from "../../../shared/constants";

const useStyles = makeStyles(() => ({
  description: {
    width: "100%",
    height: "100%"
  }
}));

function ApplicationModal(props) {
  const isCompanyApplication = props.userType === userTypes.COMPANY;
  const isUserApplication = props.userType === userTypes.USER;
  const isEditApplication = isUserApplication && !props.createApplication;

  const classes = useStyles();
  const [isJobDetailsOpen, setIsJobDetails] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(
    isEditApplication ? props.application.phone : ""
  );
  const [email, setEmail] = useState(
    isEditApplication ? props.application.email : ""
  );

  const handleJobDetailsClose = () => setIsJobDetails(false);
  const handleJobDetailsOpen = () => setIsJobDetails(true);
  const handlePhoneNumberChange = event => setPhoneNumber(event.target.value);
  const handleEmailChange = event => setEmail(event.target.value);

  return (
    <LargeModal {...props}>
      {isEditApplication && (
        <NoticeModal
          isOpen={isJobDetailsOpen}
          onClose={handleJobDetailsClose}
          viewNotice={true}
          notice={props.application.notice}
        />
      )}
      <Grid container item justify="center" alignItems="center" spacing={3}>
        <Grid container item xs={12} spacing={3} justify="center">
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {props.application.notice.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {props.application.notice.company}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3} justify="center">
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {isEditApplication
                ? props.application.firstName
                : props.firstName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {isEditApplication ? props.application.lastName : props.lastName}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            InputProps={{ readOnly: isCompanyApplication }}
            label="phone number"
            margin="dense"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </Grid>
        <Grid item>
          <TextField
            InputProps={{ readOnly: isCompanyApplication }}
            label="e-mail"
            margin="dense"
            value={email}
            onChange={handleEmailChange}
          />
        </Grid>
      </Grid>
      <Grid item className={classes.description}>
        <div className={classes.description}>
          <TextField
            InputProps={{ readOnly: isCompanyApplication }}
            fullWidth
            label="Motivational letter"
            multiline
            rows="20"
            defaultValue="some letter"
            margin="normal"
            variant="outlined"
          />
        </div>
      </Grid>
      <Grid container justify="center" alignItems="center" item spacing={3}>
        {!props.createApplication && (
          <Grid item>
            <Button variant="contained" onClick={handleJobDetailsOpen}>
              Job details
            </Button>
          </Grid>
        )}
        {isUserApplication && (
          <Fragment>
            {isEditApplication && (
              <Grid item>
                <Button variant="contained">Send new version</Button>
              </Grid>
            )}
            {props.createApplication ? (
              <Grid item>
                <Button variant="contained">Send</Button>
              </Grid>
            ) : (
              <Grid item>
                <Button variant="contained">Delete</Button>
              </Grid>
            )}
          </Fragment>
        )}
        <Grid item>
          <Button variant="contained" onClick={props.onClose}>
            Back
          </Button>
        </Grid>
      </Grid>
    </LargeModal>
  );
}

ApplicationModal.propTypes = {
  userType: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  application: PropTypes.object,
  createApplication: PropTypes.bool
};

ApplicationModal.defaultProps = {
  application: { notice: {} }
};

export default ApplicationModal;
