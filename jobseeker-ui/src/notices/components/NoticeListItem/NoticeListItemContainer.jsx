import { connect } from "react-redux";
import NoticeListItem from "./NoticeListItem";

const mapStateToProps = state => ({
  userType: state.auth.userType,
  companyName: state.auth.companyName
});

export default connect(mapStateToProps, null)(NoticeListItem);
