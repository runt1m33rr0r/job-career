import axios from "axios";
import { BASE_ROUTE } from "../../shared/config";

const CATEGORIES_ROUTE = `${BASE_ROUTE}categories\\`;

export async function getAllCategories() {
  try {
    const response = await axios.get(CATEGORIES_ROUTE);

    console.log(response.data);

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function modifyCategory({ id, name }) {
  try {
    const response = await axios.patch(`${CATEGORIES_ROUTE}${id}`, { name });

    console.log(response.data);

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function deleteCategory({ id }) {
  try {
    const response = await axios.delete(`${CATEGORIES_ROUTE}${id}`);

    console.log(response.data);

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function createCategory({ name }) {
  try {
    const response = await axios.post(`${CATEGORIES_ROUTE}`, { name });

    console.log(response.data);

    if (response.data.success) {
      return await getAllCategories();
    }

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}
