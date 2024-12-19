import { createSlice } from "@reduxjs/toolkit";

const StudentSlice = createSlice({
  name: "students",
  initialState: {
    students: [], // For storing student data
    query: "",    // For storing the search query
  },
  reducers: {
    allStudents: (state, action) => {
      state.students = action.payload; 
    },
    SearchQuery: (state, action) => {
      state.query = action.payload; 
    },
  },
});

export const { allStudents, SearchQuery } = StudentSlice.actions;

export default StudentSlice.reducer;
