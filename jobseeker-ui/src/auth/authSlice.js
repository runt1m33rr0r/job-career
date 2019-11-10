import { createSlice } from "redux-starter-kit";

const initialState = {
  userType: "",
  firstName: "",
  lastName: "",
  companyName: "",
  eMail: "",
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: state => {
      state.isAuthenticated = true;
    },
    loginSuccess: state => {
      state.isAuthenticated = true;
    },
    loginFailure: state => {
      state.isAuthenticated = false;
    },
    logout: state => initialState,
    registerRequest: state => {
      state.isAuthenticated = false;
    },
    registerSuccess: state => {
      state.isAuthenticated = true;
    },
    registerFailure: state => {
      state.isAuthenticated = false;
    }
  }
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout
} = authSlice.actions;

export default authSlice.reducer;
