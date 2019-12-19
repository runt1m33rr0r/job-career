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
    categories: []
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

export const createCategoryRequest = categoryData => async (
  dispatch,
  getState
) =>
  dispatch(
    makeRequest({
      requestFunction: createCategory,
      successAction: createCategorySuccess,
      requestData: { ...categoryData, token: getState().auth.token },
      shouldAlert: false
    })
  );

export const getAllCategoriesRequest = () => async (dispatch, getState) =>
  dispatch(
    makeRequest({
      requestFunction: getAllCategories,
      successAction: getAllCategoriesSuccess,
      requestData: { token: getState().auth.token },
      shouldAlert: false
    })
  );

export const deleteCategoryRequest = categoryData => async (
  dispatch,
  getState
) =>
  dispatch(
    makeRequest({
      requestFunction: deleteCategory,
      successAction: deleteCategorySuccess,
      requestData: { ...categoryData, token: getState().auth.token },
      shouldAlert: false
    })
  );

export const modifyCategoryRequest = categoryData => async (
  dispatch,
  getState
) =>
  dispatch(
    makeRequest({
      requestFunction: modifyCategory,
      successAction: modifyCategorySuccess,
      requestData: { ...categoryData, token: getState().auth.token },
      shouldAlert: false
    })
  );
