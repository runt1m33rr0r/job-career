import { connect } from "react-redux";
import Notification from "./Notification";
import { disableMessage } from "../../data/networkSlice";

const mapStateToProps = state => state.network;

const mapDispatchToProps = { disableMessage };

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
