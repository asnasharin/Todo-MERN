import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import api from "../../API/Api";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux/store";
import { getAllMytodos } from "../../servieces/todoServiece";
import { IMyTodos } from "../../types/todoTypes";

type prop = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  dleteId: string;
  setDeleteId: Dispatch<SetStateAction<string>>;
  setCurrentTodo: Dispatch<SetStateAction<IMyTodos | undefined>>;
  currentTodo: IMyTodos;
};
export default function ConformDeleteModal({
  openModal,
  setOpenModal,
  dleteId,
  setDeleteId,
  currentTodo,
  setCurrentTodo,
}: prop) {
  useEffect(() => {
    setDeleteId(dleteId);
  }, [dleteId, setDeleteId]);
  const dispatch = useAppDispatch();
  async function deleteTodo() {
    try {
      const { data } = await api.delete(`/todo/${dleteId}`);
      if (data) {
        setCurrentTodo({
          ...currentTodo,
          todos: currentTodo.todos.filter((e) => e._id !== dleteId),
        });
        setDeleteId("");
        toast.success("Todo Deleted");
        setOpenModal(false);
        dispatch(getAllMytodos());
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal
      show={openModal}
      onClose={() => {
        setDeleteId("");
        setOpenModal(false);
      }}
      size={"xl"}
    >
      <Modal.Body>
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-2xl dark:text-gray-100">
            Are you sure want to delete this
          </h1>
          <div className="w-full mt-5 flex justify-between gap-2">
            <button
              onClick={() => deleteTodo()}
              className="w-1/2 rounded-lg py-2 text-gray-100 bg-red-600"
            >
              Yes
            </button>
            <button
              className="w-1/2 rounded-lg py-2 text-gray-100 bg-gray-500"
              onClick={() => {
                setDeleteId("");
                setOpenModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
