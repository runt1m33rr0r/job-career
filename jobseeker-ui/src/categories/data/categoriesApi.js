import axios from "axios";
import { BASE_ROUTE } from "../../shared/config";

const CATEGORIES_ROUTE = `${BASE_ROUTE}categories\\`;

export async function getAllCategories({ token }) {
  console.log({ token });

  try {
    const response = await axios.post(`${CATEGORIES_ROUTE}search`, { token });

    console.log(response.data);

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function modifyCategory({ id, name, token }) {
  console.log({ id, name, token });

  try {
    const response = await axios.patch(`${CATEGORIES_ROUTE}${id}`, {
      name,
      token
    });

    console.log(response.data);

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function deleteCategory({ id, token }) {
  console.log({ id, token });

  try {
    const response = await axios.delete(`${CATEGORIES_ROUTE}${id}`, {
      data: { token }
    });

    console.log(response.data);

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}

export async function createCategory({ name, token }) {
  console.log({ name, token });

  try {
    const response = await axios.post(`${CATEGORIES_ROUTE}`, { name, token });

    console.log(response.data);

    if (response.data.success) {
      return await getAllCategories({ token });
    }

    return response.data;
  } catch ({ message, response: { data } }) {
    return { sucess: false, message: data.message ? data.message : message };
  }
}
