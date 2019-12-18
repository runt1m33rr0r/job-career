import Applications from "./Applications";
import { connect } from "react-redux";
import { getApplicationsRequest } from "../../data/applicationsSlice";
import { getCompanyNoticesRequest } from "../../../notices/data/noticesSlice";

const mapStateToProps = state => ({
  applications: state.applications.applications,
  userType: state.auth.userType,
  userId: state.auth.userId,
  notices: state.notices.notices
});

const mapDispatchToProps = { getApplicationsRequest, getCompanyNoticesRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
