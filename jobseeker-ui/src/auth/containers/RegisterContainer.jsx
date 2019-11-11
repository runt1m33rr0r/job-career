import { connect } from "react-redux";
import Register from "../components/Register";
import { registerRequest } from "../data/authSlice";

const mapDispatchToProps = { registerRequest };

export default connect(
  null,
  mapDispatchToProps
)(Register);
