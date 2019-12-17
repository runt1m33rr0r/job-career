import axios from "axios";
import { BASE_ROUTE } from "../../shared/config";

const NOTICES_ROUTE = `${BASE_ROUTE}notices\\`;

export async function getNotices({ keywords, approved, token }) {
  console.log({ keywords, approved, token });

  try {
    let status;
    if (approved === true) {
      status = "APPROVED";
    } else if (approved === false) {
      status = "PENDING";
    }

    const response = await axios.post(`${NOTICES_ROUTE}search`, {
      keywords,
      status,
      token
    });

    const processedNotices = response.data.notices.map(notice => ({
      id: notice.id,
      title: notice.title,
      category: notice.category.name,
      company: notice.company.name,
      content: notice.description,
      closed: notice.status === "CLOSED",
      approved: notice.status === "APPROVED",
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
    const res = await getNotices({ keywords: [], token });

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
  closed,
  approved,
  company,
  token,
  keywords,
  showApproved
}) {
  console.log({
    id,
    category,
    title,
    description,
    closed,
    approved,
    company,
    token
  });

  let status;
  if (closed !== undefined) {
    if (closed) {
      status = "CLOSED";
    } else if (!closed) {
      status = "OPEN";
    }
  }

  if (approved !== undefined) {
    if (approved) {
      status = "APPROVED";
    } else {
      status = "PENDING";
    }
  }

  console.log(status);

  try {
    const response = await axios.patch(`${NOTICES_ROUTE}${id}`, {
      category,
      title,
      description,
      status,
      token
    });

    if (response.data.success) {
      if (company) {
        return await getCompanyNotices({ company, token });
      }

      return await getNotices({ keywords, approved: showApproved, token });
    } else {
      return response.data;
    }
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
