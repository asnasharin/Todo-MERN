import { createSlice } from "@reduxjs/toolkit";
import { IinitialState } from "../types/todoTypes";
import { getAllMyTodos } from "../services/todoServices";
import { errorMessage } from "../types/authTypes";

const todos = JSON.parse(localStorage.getItem("todos") as string);

const initialState: IinitialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  todos: todos ? todos : null,
  error: {
    message: "",
    status: null,
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.error = {
        message: "",
        status: null,
      };
    },
  },
  extraReducers: (builer) => {
    builer
      .addCase(getAllMyTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMyTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = action.payload;
        localStorage.setItem("todos", JSON.stringify(action.payload));
      })
      .addCase(getAllMyTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as errorMessage;
      });
  },
});

export const { reset } = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;
