import { useState } from "react";
import CreateTodoModal from "../createTodo/createTodo";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";

function Sidebar() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { todos } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  

  return (
    <>
      <CreateTodoModal openModal={openModal} setOpenModal={setOpenModal} />

      <div className="w-[300px] h-screen bg-gray-800 text-white flex flex-col">
        <div className="p-4">
          <h1 className="text-lg font-bold">Todo App</h1>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-purple-900 hover:bg-purple-800 text-gray-200 py-2 rounded-lg font-bold m-4"
        >
          Add Todo
        </button>

        <div className="h-[400px] w-full p-2 flex flex-col gap-2 overflow-y-auto items-start justify-start">
          { todos &&
            todos.map((e) => (
              <div
                key={e._id}
                className="w-full h-10 bg-slate-300 cursor-pointer text-gray-900 dark:bg-gray-700 dark:text-gray-200 rounded-lg flex flex-shrink-0 items-center justify-center"
              >
                <h1>{e._id.split("-").reverse().join("-")}</h1>
              </div>
            ))
          }
        </div>

        <div className="mt-auto p-4">
          <button
            onClick={() => {
              dispatch(logout())
              navigate("/signin")
            }}
            className="bg-red-600 p-2 rounded-md w-full hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
