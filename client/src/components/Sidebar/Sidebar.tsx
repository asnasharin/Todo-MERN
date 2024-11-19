import { useState } from "react";
import CreateTodoModal from "../createTodo/createTodo";


function Sidebar() {
  const [openModal, setOpenModal] = useState<boolean>(false);

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

        <div className="mt-auto p-4">
          <button className="bg-red-600 p-2 rounded-md w-full hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
