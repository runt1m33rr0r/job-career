import { connect } from "react-redux";
import Notices from "./Notices";
import {
  getCompanyNoticesRequest,
  getNoticesRequest
} from "../../data/noticesSlice";
import { getAllCategoriesRequest } from "../../../categories/data/categoriesSlice";

const mapStateToProps = state => ({
  notices: state.notices.notices
});

const mapDispatchToProps = {
  getCompanyNoticesRequest,
  getNoticesRequest,
  getAllCategoriesRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
