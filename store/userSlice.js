import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    users: [],
    totalPages :1,
    currentPage:1
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers:(state,action)=>{
            state.users = action.payload.users;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
        }, 
        setPage: (state,action)=>{
            state.currentPage = action.payload;
        },
        addUser: (state, action) => {
            state.users = [action.payload, ...state.users]; // Add new user to the list
          },
          deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
          },
    },
})

export const { setUsers, setPage,addUser } = usersSlice.actions;

export const fetchUsers = (page = 1) => async (dispatch) => {
    try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        dispatch(setUsers({users: response.data.data, totalPages: response.data.total_pages, currentPage: page}));
    } catch (error) {
        console.error("Error fetching users:", error.message);
    }
};
export const createUser = (userData) => async (dispatch) => {
    try {
      const response = await axios.post("https://reqres.in/api/users", userData);
      dispatch(addUser(response.data)); // Update Redux store immediately
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  export const removeUser = (id) => async (dispatch) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      dispatch(deleteUser(id)); // Remove user from Redux store
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
export default usersSlice.reducer;