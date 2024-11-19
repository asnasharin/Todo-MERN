import { ITodo } from "../types/todoTypes";
import api from "../Api/Api"


export const CreateTodo = async (todo: ITodo) => {
    try {
        const { data } = await api.post("/todo", todo)
        return data
    } catch (error) {
       console.log(error) 
    }
}