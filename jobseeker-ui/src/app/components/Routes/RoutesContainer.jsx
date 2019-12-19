import { connect } from "react-redux";
import Routes from "./Routes";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  userType: state.auth.userType
});

export default connect(mapStateToProps)(Routes);
