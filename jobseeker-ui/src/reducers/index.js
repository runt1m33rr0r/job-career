import { combineReducers } from "redux";
import authReducer from "../auth/data/authSlice";
import networkReducer from "../app/data/networkSlice";
import categoriesReducer from "../categories/data/categoriesSlice";
import noticesReducer from "../notices/data/noticesSlice";
import applicationsReducer from "../applications/data/applicationsSlice";

export default combineReducers({
  auth: authReducer,
  network: networkReducer,
  categories: categoriesReducer,
  notices: noticesReducer,
  applications: applicationsReducer
});
