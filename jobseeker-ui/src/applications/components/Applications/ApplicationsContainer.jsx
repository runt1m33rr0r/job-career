import Applications from "./Applications";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  applications: state.applications.applications,
  userType: state.auth.userType
});

export default connect(mapStateToProps, null)(Applications);
