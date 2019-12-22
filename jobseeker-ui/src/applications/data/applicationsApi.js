import axios from "axios";
import { BASE_ROUTE } from "../../shared/config";

const APPLICATIONS_ROUTE = `${BASE_ROUTE}applications\\`;

export async function getApplications({
  personId,
  noticeId,
  companyId,
  token
}) {
  console.log({ personId, noticeId, companyId, token });

  try {
    const response = await axios.post(`${APPLICATIONS_ROUTE}search`, {
      personId,
      noticeId,
      companyId,
      token
    });

    console.log(response.data);

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function editApplication({ id, number, email, letter, token }) {
  console.log({ id, number, email, letter, token });

  try {
    const response = await axios.patch(`${APPLICATIONS_ROUTE}${id}`, {
      id,
      number,
      email,
      letter,
      token
    });

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function createApplication({
  candidateId,
  noticeId,
  phone,
  email,
  letter,
  token
}) {
  try {
    console.log({
      candidateId,
      noticeId,
      phone,
      email,
      letter,
      token
    });

    const response = await axios.post(APPLICATIONS_ROUTE, {
      personId: candidateId,
      noticeId,
      number: phone,
      email,
      letter,
      token
    });

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function deleteApplication({ id, token }) {
  try {
    const response = await axios.delete(`${APPLICATIONS_ROUTE}${id}`, {
      data: { token }
    });

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}
