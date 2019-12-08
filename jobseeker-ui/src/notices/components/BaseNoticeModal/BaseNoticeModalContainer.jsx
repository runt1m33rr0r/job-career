import { connect } from "react-redux";
import BaseNoticeModal from "./BaseNoticeModal";

const mapStateToProps = state => ({
  categories: state.categories.categories
});

export default connect(mapStateToProps, null)(BaseNoticeModal);
