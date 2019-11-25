import { createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "../../app/data/networkSlice";
import { register, login, changeProfile, logOut } from "./authApi";
import { getString, getItem } from "../../shared/storageUtils";

const getInitialState = () => ({
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
    makeRequest(register, loginSuccess, registerFailure, registrationData)
  );

export const loginRequest = loginData => async dispatch =>
  dispatch(makeRequest(login, loginSuccess, loginFailure, loginData));

export const profileChangeRequest = profileData => async dispatch =>
  dispatch(
    makeRequest(
      changeProfile,
      profileChangeSuccess,
      profileChangeFailure,
      profileData
    )
  );

export const logoutRequest = () => async (dispatch, getState) =>
  dispatch(
    makeRequest(logOut, logoutSuccess, logoutFailure, {
      email: getState().email
    })
  );
