import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/Api"
import { AxiosError } from "axios";
import { loginCredentials, userData } from "../types/authTypes";



export const signup = createAsyncThunk(
    "auth/signup",
    async (userdata: userData, thunkApi) => {
        try {
            const response = await api.post("/signup", userdata);
            return response.data
        } catch (error) {
            const axiosError = error as AxiosError;
            let payload;
            if (axiosError.message === "Network Error") {
                payload = {
                    message: axiosError.message,
                    status: 404,
                }
            } else {
                const Error =  (axiosError?.response?.data as { message: string})
                payload = {
                    message: Error,
                    status: axiosError.status,
                }
            }
            return thunkApi.rejectWithValue(payload);
        }
    }
)

export const signin = createAsyncThunk(
    "auth/signin",
    async (formData: loginCredentials, thunkApi) => {
        try {
            const response = await api.post('/signin', formData)
            return response.data
        } catch (error) {
           const axiosError = error as AxiosError
           let payload
           if (axiosError.message === "Network Error") {
            payload = {
                message: axiosError.message,
                status: 404,
            }
        } else {
            const Error =  (axiosError?.response?.data as { message: string})
            payload = {
                message: Error,
                status: axiosError.status,
            }
        }
        return thunkApi.rejectWithValue(payload);
    }
    }
)