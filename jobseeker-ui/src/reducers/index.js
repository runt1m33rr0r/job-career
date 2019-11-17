import { combineReducers } from "redux";
import authReducer from "../auth/data/authSlice";
import networkReducer from "../app/data/networkSlice";

export default combineReducers({
  auth: authReducer,
  network: networkReducer
});
