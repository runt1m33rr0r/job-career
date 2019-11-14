import { connect } from "react-redux";
import Login from "./Login";
import { loginRequest } from "../../data/authSlice";

const mapDispatchToProps = { loginRequest };

export default connect(null, mapDispatchToProps)(Login);
