import { connect } from "react-redux";
import Notices from "./Notices";
import { getCompanyNoticesRequest } from "../../data/noticesSlice";
import { getAllCategoriesRequest } from "../../../categories/data/categoriesSlice";

const mapDispatchToProps = {
  getCompanyNoticesRequest,
  getAllCategoriesRequest
};

const mapStateToProps = state => ({
  notices: state.notices.notices,
  ...state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
