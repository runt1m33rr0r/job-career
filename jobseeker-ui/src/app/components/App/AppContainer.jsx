import { connect } from "react-redux";
import App from "./App";
import { logout } from "../../../auth/data/authSlice";

const mapStateToProps = state => state.auth;

const mapDispatchToProps = { requestLogout: logout };

export default connect(mapStateToProps, mapDispatchToProps)(App);
