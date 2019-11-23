import axios from "axios";
import { BASE_ROUTE } from "../../shared/config";
import { setItem, removeAll } from "../../shared/storageUtils";
import { usualUserTypes } from "../../shared/constants";

const USERS_ROUTE = `${BASE_ROUTE}users\\`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function register({
  userType,
  firstName,
  lastName,
  companyName,
  email,
  password
}) {
  try {
    let requestData = { companyName, email, password };

    if (userType === usualUserTypes.USER) {
      requestData = {
        firstName,
        lastName,
        email,
        password
      };
    }

    const response = await axios.post(`${USERS_ROUTE}register`, requestData);

    console.log(response.data);

    if (response.data.success) {
      return await login({ email, password });
    }

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function login({ email, password }) {
  console.log({ email, password });

  try {
    const response = await axios.post(`${USERS_ROUTE}login`, {
      email,
      password
    });

    const userData = {
      success: response.data.success,
      message: response.data.message,
      email: response.data.user.email,
      firstName: response.data.user.firstName,
      lastName: response.data.user.lastName,
      companyName: response.data.user.name,
      phoneNumber: response.data.user.number,
      userType: response.data.user.type.toLowerCase(),
      token: response.data.user.token
    };

    console.log(userData);

    if (userData.success) {
      setItem("email", email);
      setItem("firstName", userData.firstName);
      setItem("lastName", userData.lastName);
      setItem("companyName", userData.companyName);
      setItem("phoneNumber", userData.phoneNumber);
      setItem("userType", userData.userType);
      setItem("token", userData.token);
    }

    return userData;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function logOut({ email }) {
  try {
    const response = await axios.post(`${USERS_ROUTE}logout`, { email });

    if (response.data.success) {
      removeAll();
    }

    console.log(response.data);

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function changeProfile({
  firstName,
  lastName,
  companyName,
  phoneNumber,
  eMail,
  password
}) {
  console.log({
    firstName,
    lastName,
    companyName,
    phoneNumber,
    eMail,
    password
  });

  await sleep(1000);

  return {
    success: true,
    message: "Profile change successful!",
    token: "123456"
  };
}
