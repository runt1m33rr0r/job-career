import { connect } from "react-redux";
import App from "./App";
import { logoutRequest } from "../../../auth/data/authSlice";
import { getAllCategoriesRequest } from "../../../categories/data/categoriesSlice";

const mapStateToProps = state => state.auth;

const mapDispatchToProps = {
  requestLogout: logoutRequest,
  getAllCategoriesRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
