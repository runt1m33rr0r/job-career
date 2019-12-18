import axios from "axios";
import { BASE_ROUTE } from "../../shared/config";

const NOTICES_ROUTE = `${BASE_ROUTE}notices\\`;

export async function getNotices({ keywords, statuses, token }) {
  console.log({ keywords, statuses, token });

  try {
    const response = await axios.post(`${NOTICES_ROUTE}search`, {
      keywords,
      statuses,
      token
    });

    const processedNotices = response.data.notices.map(notice => ({
      id: notice.id,
      title: notice.title,
      category: notice.category.name,
      company: notice.company.name,
      content: notice.description,
      status: notice.status,
      lastModified: notice.lastModified
        ? notice.lastModified
        : new Date().toLocaleDateString("en-US")
    }));

    return {
      success: true,
      message: "Notices gathered successfully!",
      notices: processedNotices
    };
  } catch ({ message }) {
    return { sucess: false, message };
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
      const companyNotices = notices.filter(el => el.company === company);

      return {
        success: true,
        message: "Notices gathered successfully!",
        notices: companyNotices
      };
    }
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function createNotice({
  title,
  category,
  content: description,
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
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function editNotice({
  id,
  category,
  title,
  content: description,
  status,
  token
}) {
  console.log({
    id,
    category,
    title,
    content: description,
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
  } catch ({ message }) {
    return { sucess: false, message };
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
  } catch ({ message }) {
    return { sucess: false, message };
  }
}
