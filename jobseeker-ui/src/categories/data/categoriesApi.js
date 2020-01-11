import axios from "axios";
import { BASE_ROUTE } from "../../shared/config";

const CATEGORIES_ROUTE = `${BASE_ROUTE}categories\\`;

export async function getAllCategories({ token }) {
  try {
    const response = await axios.post(`${CATEGORIES_ROUTE}search`, { token });

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function modifyCategory({ id, name, token }) {
  try {
    const response = await axios.patch(`${CATEGORIES_ROUTE}${id}`, {
      name,
      token
    });

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function deleteCategory({ id, token }) {
  try {
    const response = await axios.delete(`${CATEGORIES_ROUTE}${id}`, {
      data: { token }
    });

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function createCategory({ name, token }) {
  try {
    const response = await axios.post(`${CATEGORIES_ROUTE}`, { name, token });

    if (response.data.success) {
      return await getAllCategories({ token });
    }

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}
