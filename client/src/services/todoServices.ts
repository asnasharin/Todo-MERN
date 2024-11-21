import { ITodo } from "../types/todoTypes";
import api from "../Api/Api"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const CreateTodo = async (todo: ITodo) => {
    try {
        const { data } = await api.post("/todo", todo)
        return data
    } catch (error) {
       console.log(error) 
    }
}


export const getAllMyTodos = createAsyncThunk(
    "todo/get",
    async (_, thunkAPI) => {
      try {
        const response = await api.get("/todo");
        return response.data.todo;
        
      } catch (error) {
        const axiosError = error as AxiosError;
        const Error = (axiosError?.response?.data as { message: string }).message;
        const payload = {
          message: Error,
          status: axiosError.status,
        };
        return thunkAPI.rejectWithValue(payload);
      }
    }
  );



// export const getAllMyTodos = createAsyncThunk(
//   "todo/get",
//   async (_, thunkAPI) => {
//     try {
//       const response = await api.get("/todo");
//       console.log("API response:", response.data); // Log the entire response
//       return response.data.todo;
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       console.error("API error:", axiosError); // Log the full error object
//       const Error = (axiosError?.response?.data as { message: string }).message;
//       const payload = {
//         message: Error,
//         status: axiosError.status,
//       };
//       console.error("Error payload:", payload); // Log the error payload
//       return thunkAPI.rejectWithValue(payload);
//     }
//   }
// );
