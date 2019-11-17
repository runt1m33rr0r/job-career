import { connect } from "react-redux";
import Register from "./Register";
import { registerRequest } from "../../data/authSlice";

const mapStateToProps = state => ({
  isFetching: state.network.isFetching
});

const mapDispatchToProps = { registerRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
