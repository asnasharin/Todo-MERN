import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IMyTodos, Itodo } from "../../types/todoTypes";
import CheckBox from "../CheckBox/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "./todoCard.css";
import ConformDeleteModal from "../ConformDelete/ConformDeleteModal";
import api from "../../API/Api";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux/store";
import { getAllMytodos } from "../../servieces/todoServiece";
import { formatDate } from "../../utils/formatData";
import EditTodoMdal from "../EditTodoMdal/EditTodoMdal";

interface prop extends Itodo {
  setCurrentTodo: Dispatch<SetStateAction<IMyTodos | undefined>>;
  currentTodo: IMyTodos;
  todos: Itodo[];
}
export default function TodoCard({
  title,
  description,
  dueDate,
  priority,
  _id,
  isCompleted,
  setCurrentTodo,
  currentTodo,
  todos,
}: prop) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditModal, setEditOpenModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [editTodo, setEditTodo] = useState<Itodo>();
  const [completed, setCompleted] = useState<boolean>(
    isCompleted as unknown as boolean
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    setCompleted(isCompleted as unknown as boolean);
  }, [isCompleted]);

  let myPriority;
  switch (priority) {
    case "low":
      myPriority = "bg-yellow-300";
      break;
    case "medium":
      myPriority = "bg-orange-300";
      break;
    case "high":
      myPriority = "bg-red-500";
      break;
    default:
      myPriority = "";
      break;
  }
  return (
    <>
      <EditTodoMdal
        editTodo={editTodo}
        openModal={openEditModal}
        setOpenModal={setEditOpenModal}
      />
      <ConformDeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setDeleteId={setDeleteId}
        dleteId={deleteId}
        currentTodo={currentTodo}
        setCurrentTodo={setCurrentTodo}
      />
      <div className="dark:bg-gray-600/[0.4] flex-shrink-0 bg-gray-100 ring-gray-300 todo-card relative ring-1  dark:ring-gray-700 p-3 text-gray-600 h-fit dark:text-teal-50 rounded-md flex justify-between">
        <div className="flex">
          <div
            className="cursor-pointer w-fit p-3"
            onClick={() => {
              (async function () {
                const { data } = await api.patch(`/todo/${_id}`);
                if (data) {
                  dispatch(getAllMytodos());
                  toast.success("Status updated");
                  setCompleted((e) => !e);
                }
              })();
            }}
          >
            <CheckBox checked={completed} />
          </div>
          <div className="flex items-end">
            <div>
              <h1>{title}</h1>
              <small>{description}</small>
              <div>
                <small>due: {formatDate(dueDate)}</small>
              </div>
            </div>
            <div className="flex items-center ms-3 gap-2">
              <div className={`w-3 h-3 rounded-full ${myPriority}`}></div>
              <small>{priority}</small>
            </div>
          </div>
        </div>
        <div className="absolute options right-3 top-3 flex flex-col items-center justify-center">
          <div
            onClick={() => {
              setDeleteId(_id as unknown as string);
              setOpenModal(true);
            }}
          >
            <DeleteIcon className="cursor-pointer  hover:text-red-500" />
          </div>
          <div
            onClick={() => {
              setEditTodo(todos.find((e) => e._id === _id));
              setEditOpenModal(true);
            }}
          >
            <ModeEditIcon className="cursor-pointer hover:text-blue-600" />
          </div>
        </div>
      </div>
    </>
  );
}
