import { createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "../../app/data/networkSlice";
import {
  getAllCategories,
  modifyCategory,
  deleteCategory,
  createCategory
} from "./categoriesApi";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { categories: [] },
  reducers: {
    getAllCategoriesSuccess: (state, action) => {
      state.categories = action.payload.categories;
    },
    createCategorySuccess: (state, action) => {
      state.categories.push({ name: action.payload.categoryName });
    },
    deleteCategorySuccess: (state, action) => {
      state.categories = state.categories.filter(
        category => category.id === action.payload.categoryId
      );
    },
    modifyCategorySuccess: (state, action) => {
      const categoryIndex = state.categories.find(
        category => category.id === action.payload.categoryId
      );

      state.categories[categoryIndex].name = action.payload.categoryName;
    }
  }
});

export const {
  getAllCategoriesSuccess,
  createCategorySuccess,
  deleteCategorySuccess,
  modifyCategorySuccess
} = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const createCategoryRequest = categoryData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: createCategory,
      successAction: createCategorySuccess,
      requestData: categoryData
    })
  );

export const getAllCategoriesRequest = () => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: getAllCategories,
      successAction: getAllCategoriesSuccess
    })
  );

export const deleteCategoryRequest = categoryData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: deleteCategory,
      successAction: deleteCategorySuccess,
      requestData: categoryData
    })
  );

export const modifyCategoryRequest = categoryData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: modifyCategory,
      successAction: modifyCategorySuccess,
      requestData: categoryData
    })
  );
