import { createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "../../app/data/networkSlice";
import { register, login, changeProfile, logOut } from "./authApi";
import { getString, getItem } from "../../shared/storageUtils";

const getInitialState = () => ({
  userId: getString("userId"),
  userType: getString("userType"),
  firstName: getString("firstName"),
  lastName: getString("lastName"),
  companyName: getString("companyName"),
  email: getString("email"),
  phoneNumber: getString("phoneNumber"),
  isAuthenticated: !!getItem("token")
});

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload.id;
      state.userType = action.payload.userType;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.companyName = action.payload.companyName;
      state.phoneNumber = action.payload.phoneNumber;
      state.email = action.payload.email;
    },
    loginFailure: state => {
      state.isAuthenticated = false;
    },
    logoutSuccess: () => getInitialState(),
    logoutFailure: state => {
      state.isAuthenticated = true;
    },
    registerFailure: state => {
      state.isAuthenticated = false;
    },
    profileChangeSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.companyName = action.payload.companyName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
    },
    profileChangeFailure: state => {
      state.isAuthenticated = true;
    }
  }
});

export const {
  loginSuccess,
  loginFailure,
  registerFailure,
  profileChangeSuccess,
  profileChangeFailure,
  logoutSuccess,
  logoutFailure
} = authSlice.actions;

export default authSlice.reducer;

export const registerRequest = registrationData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: register,
      successAction: loginSuccess,
      failAction: registerFailure,
      requestData: registrationData
    })
  );

export const loginRequest = loginData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: login,
      successAction: loginSuccess,
      failAction: loginFailure,
      requestData: loginData
    })
  );

export const profileChangeRequest = profileData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: changeProfile,
      successAction: profileChangeSuccess,
      failAction: profileChangeFailure,
      requestData: profileData
    })
  );

export const logoutRequest = () => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: logOut,
      successAction: logoutSuccess,
      failAction: logoutFailure,
      requestData: {
        email: getState().email
      }
    })
  );
