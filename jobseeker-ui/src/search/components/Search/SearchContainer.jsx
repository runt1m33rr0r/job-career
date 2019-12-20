import Search from "./Search";
import { connect } from "react-redux";
import { getAllCategoriesRequest } from "../../../categories/data/categoriesSlice";

const mapStateToProps = state => ({
  categories: state.categories.categories,
  userType: state.auth.userType
});

const mapDispatchToProps = {
  getAllCategoriesRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
