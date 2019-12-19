import React, { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ApplicationModal from "../ApplicationModal";
import ItemsList from "../../../shared/components/ItemsList";
import ApplicationListItem from "../ApplicationListItem";
import { userTypes } from "../../../shared/constants";

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
  const ALL_FILTERS = "all";
  const [noticeFilter, setNoticeFilter] = useState(ALL_FILTERS);

  const handleFilterChange = event => setNoticeFilter(event.target.value);

  const {
    userId,
    getApplicationsRequest,
    getCompanyNoticesRequest,
    userType
  } = props;

  useEffect(() => {
    if (userType === userTypes.COMPANY) {
      getCompanyNoticesRequest();
    }
  }, [getCompanyNoticesRequest, userType]);

  useEffect(() => {
    if (userType === userTypes.COMPANY) {
      if (noticeFilter !== ALL_FILTERS) {
        getApplicationsRequest({ noticeId: noticeFilter });
      } else {
        getApplicationsRequest({ companyId: userId });
      }
    } else if (userType === userTypes.USER) {
      getApplicationsRequest({ personId: userId });
    }
  }, [getApplicationsRequest, userId, userType, noticeFilter]);

  if (props.applications.length === 0) {
    if (props.isFetching) {
      return null;
    }

    return (
      <Typography variant="h3" gutterBottom>
        You don't have any applications!
      </Typography>
    );
  }

  return (
    <div className={classes.container}>
      {props.userType === userTypes.COMPANY && (
        <FormControl className={classes.formControl}>
          <InputLabel>Notice filter</InputLabel>

          <Select value={noticeFilter} onChange={handleFilterChange}>
            <MenuItem key={ALL_FILTERS} value={ALL_FILTERS}>
              All
            </MenuItem>
            {props.notices.map(notice => (
              <MenuItem key={notice.id} value={notice.id}>
                {notice.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <ItemsList
        items={props.applications}
        popupElement={ApplicationModal}
        listItemElement={ApplicationListItem}
      />
    </div>
  );
}

Applications.propTypes = {
  applications: PropTypes.array.isRequired,
  notices: PropTypes.array.isRequired,
  userType: PropTypes.string.isRequired,
  getApplicationsRequest: PropTypes.func.isRequired,
  getCompanyNoticesRequest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default Applications;
