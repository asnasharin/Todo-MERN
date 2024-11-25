import Drawer from "@mui/material/Drawer";
import { Dispatch, SetStateAction, useState } from "react";
import CreateTodoModal from "../CreateTodoModal/CreateTodoModal";
import UserInfo from "../UserInfo/UserInfo";
import { useAppSelector } from "../../redux/store";
import { IMyTodos } from "../../types/todoTypes";

type prop = {
  openDrawer: boolean;

  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  setCurrentTodo: Dispatch<SetStateAction<IMyTodos | undefined>>;
};

export default function Drawor({
  setCurrentTodo,
  openDrawer,
  setOpenDrawer,
}: prop) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { todos } = useAppSelector((state) => state.todo);
  return (
    <div>
      <>
        <CreateTodoModal openModal={openModal} setOpenModal={setOpenModal} />
        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          anchor="right"
        >
          <div className="w-64 flex flex-col items-center justify-between dark:bg-gray-900 dark:border-gray-800 border-gray-300 border-r-2 bg-gray-200 h-full">
            <div className="h-12 w-full p-2">
              <button
                onClick={() => setOpenModal(true)}
                className="bg-cyan-700 hover:bg-cyan-800 hover:dark:bg-cyan-600 text-gray-200 w-full py-2 rounded-lg font-bold"
              >
                Add Todo
              </button>
            </div>
            <div className="h-[400px] w-full p-2 flex flex-col  gap-2 overflow-y-auto items-start justify-start">
              {todos &&
                todos.map((e) => (
                  <div
                    onClick={() => setCurrentTodo(e)}
                    className="w-full h-10 bg-slate-300 cursor-pointer text-gray-900 dark:bg-gray-700 dark:text-gray-200 rounded-lg flex flex-shrink-0 items-center justify-center "
                  >
                    <h1>{e._id.split("-").reverse().join("-")}</h1>
                  </div>
                ))}
            </div>
            <UserInfo />
          </div>
        </Drawer>
      </>
    </div>
  );
}
