import { connect } from "react-redux";
import Notices from "./Notices";

const mapStateToProps = state => state.auth;

export default connect(mapStateToProps, null)(Notices);
