import axios from "axios";
import { BASE_ROUTE } from "../../shared/config";

const NOTICES_ROUTE = `${BASE_ROUTE}notices\\`;

export async function getNotices({ keywords, approved }) {
  try {
    let status;
    if (approved) {
      status = "APPROVED";
    } else {
      status = "PENDING";
    }

    const response = await axios.get(NOTICES_ROUTE, {
      data: { keywords, status }
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

export async function getCompanyNotices({ company }) {
  try {
    const res = await getNotices({ keywords: [] });

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
  companyName
}) {
  console.log({ title, category, description, companyName });

  try {
    const response = await axios.post(NOTICES_ROUTE, {
      title,
      category,
      description,
      companyName
    });

    if (response.data.success) {
      let res = await getCompanyNotices({ company: companyName });
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
  company
}) {
  console.log({ id, category, title, description, closed, approved, company });

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
      status
    });

    if (response.data.success) {
      return await getCompanyNotices({ company });
    } else {
      return response.data;
    }
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function deleteNotice({ id, company }) {
  try {
    const response = await axios.delete(`${NOTICES_ROUTE}${id}`, { data: {} });

    if (response.data.success) {
      let res = await getCompanyNotices({ company });
      res.message = response.data.message;

      return res;
    } else {
      return response.data;
    }
  } catch ({ message }) {
    return { sucess: false, message };
  }
}
