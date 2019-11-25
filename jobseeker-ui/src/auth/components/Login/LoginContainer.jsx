import { connect } from "react-redux";
import Login from "./Login";
import { loginRequest } from "../../data/authSlice";

const mapStateToProps = state => ({
  isFetching: state.network.isFetching
});

const mapDispatchToProps = { loginRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
