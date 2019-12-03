import { connect } from "react-redux";
import CreateNotice from "./CreateNotice";
import { createNoticeRequest } from "../../data/noticesSlice";

const mapStateToProps = state => ({
  categories: state.categories.categories,
  companyName: state.auth.companyName
});

const mapDispatchToProps = { createNoticeRequest };

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotice);
