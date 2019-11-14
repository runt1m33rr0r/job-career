import { connect } from "react-redux";
import Register from "./Register";
import { registerRequest } from "../../data/authSlice";

const mapDispatchToProps = { registerRequest };

export default connect(null, mapDispatchToProps)(Register);
