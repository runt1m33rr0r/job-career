import axios from "axios";
import { BASE_ROUTE } from "../../shared/config";

const NOTICES_ROUTE = `${BASE_ROUTE}notices\\`;

export async function getNotices({ keywords, statuses, category, token }) {
  console.log({ keywords, statuses, token });

  try {
    const response = await axios.post(`${NOTICES_ROUTE}search`, {
      keywords,
      statuses,
      category,
      token
    });

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function getCompanyNotices({ company, token }) {
  console.log({ company, token });

  try {
    const res = await getNotices({
      keywords: [],
      statuses: ["OPEN", "CLOSED", "PENDING", "DENIED"],
      token
    });

    if (res.success) {
      const notices = res.notices;
      const companyNotices = notices.filter(el => el.company.name === company);

      return {
        success: true,
        message: "Notices gathered successfully!",
        notices: companyNotices
      };
    }
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function createNotice({
  title,
  category,
  description,
  companyName,
  token
}) {
  console.log({ title, category, description, companyName, token });

  try {
    const response = await axios.post(NOTICES_ROUTE, {
      title,
      category,
      description,
      companyName,
      token
    });

    if (response.data.success) {
      let res = await getCompanyNotices({ company: companyName, token });
      res.message = response.data.message;

      return res;
    } else {
      return response.data;
    }
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function editNotice({
  id,
  category,
  title,
  description,
  status,
  token
}) {
  console.log({
    id,
    category,
    title,
    description,
    status,
    token
  });

  try {
    const response = await axios.patch(`${NOTICES_ROUTE}${id}`, {
      category,
      title,
      description,
      status,
      token
    });

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function deleteNotice({ id, company, token }) {
  try {
    const response = await axios.delete(`${NOTICES_ROUTE}${id}`, {
      data: { token }
    });

    if (response.data.success) {
      let res = await getCompanyNotices({ company, token });
      res.message = response.data.message;

      return res;
    } else {
      return response.data;
    }
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}
