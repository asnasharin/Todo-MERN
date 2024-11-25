import { errorMessage } from "./authTypes";

export interface Itodo {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  isCompleted?: boolean;
  _id?: string;
  createdAt?: string;
}

export interface IMyTodos {
  _id: string;
  todos: Itodo[];
}

export interface IinitialState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: errorMessage;
  todos: IMyTodos[] | null;
}
