import { createSlice } from "@reduxjs/toolkit";
import { signin, signup } from "../services/authService";
import { AuthInterface, errorMessage } from "../types/authTypes";



const user = localStorage.getItem("user");
const initialState: AuthInterface = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    user: user ? JSON.parse(user) : null,
    errorMessage: {
    message: "",
    status: null,
  },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("todos");
          },
          reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.errorMessage = {
              message: "",
              status: null,
            };
            state.isSuccess = false;
          }, 
    },
    extraReducers: (builder) => {
        builder
        .addCase(signup.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(signup.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
          })
          .addCase(signup.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.errorMessage = action.payload as errorMessage;
          })
          .addCase(signin.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(signin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload.user
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
          })
          .addCase(signin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true
            state.errorMessage = action.payload as errorMessage
          })
    }
})

export const { logout, reset } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;