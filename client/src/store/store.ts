import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import todoReducer from "../features/todoSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: todoReducer
    },
});


type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;