import Applications from "./Applications";
import { connect } from "react-redux";
import { getApplicationsRequest } from "../../data/applicationsSlice";

const mapStateToProps = state => ({
  applications: state.applications.applications,
  userType: state.auth.userType,
  userId: state.auth.userId
});

const mapDispatchToProps = { getApplicationsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
