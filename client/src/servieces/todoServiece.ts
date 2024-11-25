import { AxiosError } from "axios";
import api from "../API/Api";
import { Itodo } from "../types/todoTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createTodo = async (todo: Itodo) => {
  try {
    const { data } = await api.post("/todo", todo);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const editMyTodo = async (todo: Itodo, id: string) => {
  try {
    const { data } = await api.put(`/todo/${id}`, todo);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllMytodos = createAsyncThunk(
  "todo/get",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/todo");
      return response.data;
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
