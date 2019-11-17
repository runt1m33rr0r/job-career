import axios from "axios";
import { BASE_ROUTE } from "../../shared/config";

const USERS_ROUTE = `${BASE_ROUTE}users\\`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function register({
  type,
  firstName,
  lastName,
  companyName,
  eMail,
  password
}) {
  console.log({ type, firstName, lastName, companyName, eMail, password });

  try {
    let response;

    if (type === "user") {
      response = await axios.post(`${USERS_ROUTE}register-person`, {
        firstName,
        lastName,
        eMail,
        password
      });
    } else {
      response = await axios.post(`${USERS_ROUTE}register-company`, {
        companyName,
        eMail,
        password
      });
    }

    return { success: true, message: response.data };
  } catch (error) {
    return { sucess: false, message: error };
  }
}

export async function login({ eMail, password }) {
  console.log({ eMail, password });

  try {
    let response = await axios.post(`${USERS_ROUTE}login`, { eMail, password });

    console.log(response.data);

    return { success: true, message: response.data };
  } catch (error) {
    return { sucess: false, message: error };
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
