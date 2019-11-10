import { connect } from "react-redux";
import Login from "./Login";
import { loginRequest } from "./authSlice";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated
});

const mapDispatchToProps = { loginRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
