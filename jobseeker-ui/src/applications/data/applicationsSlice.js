import { createSlice } from "@reduxjs/toolkit";

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [
      {
        id: 1,
        phone: "some phone",
        email: "some mail",
        letter: "some letter",
        firstName: "first name",
        lastName: "last name",
        lastModified: "some date",
        notice: {
          id: 1,
          title: "some title",
          category: "category1",
          company: "some company",
          content: "some content",
          closed: false,
          lastModified: "some date"
        }
      },
      {
        id: 2,
        phone: "some phone",
        email: "some mail",
        letter: "some letter",
        firstName: "first name",
        lastName: "last name",
        lastModified: "some date",
        notice: {
          id: 2,
          title: "some title2",
          category: "category2",
          company: "some company",
          content: "some content",
          closed: false,
          lastModified: "some date"
        }
      }
    ]
  },
  reducers: {
    getAllApplicationsSuccess: (state, action) => {
      state.applications = action.payload.applications;
    }
  }
});

export const { getAllApplicationsSuccess } = applicationsSlice.actions;

export default applicationsSlice.reducer;
