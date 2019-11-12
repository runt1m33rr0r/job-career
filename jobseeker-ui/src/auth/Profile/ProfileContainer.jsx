import { connect } from "react-redux";
import Profile from "./Profile";
import { profileChangeRequest } from "../data/authSlice";

const mapDispatchToProps = { profileChangeRequest };

export default connect(null, mapDispatchToProps)(Profile);
