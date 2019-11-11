import { combineReducers } from "redux";
import authReducer from "../auth/data/authSlice";

export default combineReducers({
  auth: authReducer
});
