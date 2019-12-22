import { connect } from "react-redux";
import ForgottenPassword from "./ForgottenPassword";
import { forgottenPasswordRequest } from "../../data/authSlice";

const mapStateToProps = state => ({
  isFetching: state.network.isFetching
});

const mapDispatchToProps = { forgottenPasswordRequest };

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPassword);
