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

export async function modifyCategory({ categoryId, categoryName }) {
  try {
    const response = await axios.patch(`${CATEGORIES_ROUTE}\\${categoryId}`, {
      name: categoryName
    });

    console.log(response.data);

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function deleteCategory({ categoryId }) {
  try {
    const response = await axios.delete(`${CATEGORIES_ROUTE}\\${categoryId}`);

    console.log(response.data);

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}

export async function createCategory({ categoryName }) {
  try {
    const response = await axios.post(`${CATEGORIES_ROUTE}`, {
      name: categoryName
    });

    console.log(response.data);

    return response.data;
  } catch ({ message }) {
    return { sucess: false, message };
  }
}
