import { connect } from "react-redux";
import ApplicationListItem from "./ApplicationListItem";

const mapStateToProps = state => ({
  userType: state.auth.userType,
  companyName: state.auth.companyName
});

export default connect(mapStateToProps, null)(ApplicationListItem);
