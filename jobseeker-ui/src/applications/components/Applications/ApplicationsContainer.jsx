import Applications from "./Applications";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  applications: state.applications.applications
});

export default connect(mapStateToProps, null)(Applications);
