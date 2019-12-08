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
  initialState: {
    categories: [
      // { name: "category1", id: 1 },
      // { name: "category2", id: 2 }
    ]
  },
  reducers: {
    getAllCategoriesSuccess: (state, action) => {
      state.categories = action.payload.categories;
    },
    createCategorySuccess: (state, action) => {
      state.categories = action.payload.categories;
    },
    deleteCategorySuccess: (state, action) => {
      state.categories = state.categories.filter(
        category => category.id !== action.payload.id
      );
    },
    modifyCategorySuccess: (state, action) => {
      state.categories.find(
        category => category.id === action.payload.id
      ).name = action.payload.name;
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
      requestData: categoryData,
      shouldAlert: false
    })
  );

export const getAllCategoriesRequest = () => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: getAllCategories,
      successAction: getAllCategoriesSuccess,
      shouldAlert: false
    })
  );

export const deleteCategoryRequest = categoryData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: deleteCategory,
      successAction: deleteCategorySuccess,
      requestData: categoryData,
      shouldAlert: false
    })
  );

export const modifyCategoryRequest = categoryData => async dispatch =>
  dispatch(
    makeRequest({
      requestFunction: modifyCategory,
      successAction: modifyCategorySuccess,
      requestData: categoryData,
      shouldAlert: false
    })
  );
