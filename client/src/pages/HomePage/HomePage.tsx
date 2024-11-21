import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import TodoCard from "../../components/TodoCard/TodoCard"; 
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllMyTodos } from "../../services/todoServices";
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todo.todos)

  useEffect(() => {
    dispatch(getAllMyTodos())
  }, [dispatch])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        
      </div>
    </div>
  );
};

export default HomePage;
