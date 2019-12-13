import axios from "axios";
import { BASE_ROUTE } from "../../shared/config";

const APPLICATIONS_ROUTE = `${BASE_ROUTE}applications\\`;

export async function getApplications({ authorId: personId, company }) {
  console.log({ personId, company });

  try {
    const response = await axios.get(APPLICATIONS_ROUTE, {
      data: { personId, company }
    });

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function editApplication({ id, number, email, letter }) {
  console.log({ id, number, email, letter });

  try {
    const response = await axios.patch(`${APPLICATIONS_ROUTE}${id}`, {
      id,
      number,
      email,
      letter
    });

    if (response.data.success) {
      let res = await getApplications({ email });
      res.message = response.data.message;

      return res;
    } else {
      return response.data;
    }
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function createApplication({
  candidateId,
  noticeId,
  phone,
  email,
  letter
}) {
  try {
    console.log({
      candidateId,
      noticeId,
      phone,
      email,
      letter
    });

    const response = await axios.post(APPLICATIONS_ROUTE, {
      personId: candidateId,
      noticeId,
      number: phone,
      email,
      letter
    });

    if (response.data.success) {
      let res = await getApplications({ email });
      res.message = response.data.message;

      return res;
    } else {
      return response.data;
    }
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function deleteApplication({ id, email }) {
  try {
    const response = await axios.delete(`${APPLICATIONS_ROUTE}${id}`);

    if (response.data.success) {
      let res = await getApplications({ email });
      res.message = response.data.message;

      return res;
    } else {
      return response.data;
    }
  } catch ({ message }) {
    return { sucess: false, message };
  }
}
