import { connect } from "react-redux";
import ApplicationListItem from "./ApplicationListItem";

const mapStateToProps = state => ({
  userType: state.auth.userType
});

export default connect(mapStateToProps, null)(ApplicationListItem);
