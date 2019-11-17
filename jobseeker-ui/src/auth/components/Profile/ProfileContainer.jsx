import { connect } from "react-redux";
import Profile from "./Profile";
import { profileChangeRequest } from "../../data/authSlice";

const mapStateToProps = state => ({
  isFetching: state.network.isFetching
});

const mapDispatchToProps = { profileChangeRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
