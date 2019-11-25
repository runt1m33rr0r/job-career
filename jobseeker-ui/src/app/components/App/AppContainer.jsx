import { connect } from "react-redux";
import App from "./App";
import { logoutRequest } from "../../../auth/data/authSlice";

const mapStateToProps = state => state.auth;

const mapDispatchToProps = { requestLogout: logoutRequest };

export default connect(mapStateToProps, mapDispatchToProps)(App);
