import { connect } from "react-redux";
import Notices from "./Notices";

const mapStateToProps = state => ({
  notices: state.notices.notices,
  ...state.auth
});

export default connect(mapStateToProps, null)(Notices);
