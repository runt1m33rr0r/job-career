import { connect } from "react-redux";
import Categories from "./Categories";
import {
  createCategoryRequest,
  getAllCategoriesRequest,
  deleteCategoryRequest,
  modifyCategoryRequest
} from "../../data/categoriesSlice";

const mapStateToProps = state => ({
  categories: state.categories.categories,
  isFetching: state.network.isFetching
});

const mapDispatchToProps = {
  createCategoryRequest,
  getAllCategoriesRequest,
  deleteCategoryRequest,
  modifyCategoryRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
