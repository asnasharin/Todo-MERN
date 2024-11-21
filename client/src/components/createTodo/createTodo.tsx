import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ITodo } from "../../types/todoTypes";
import { validate } from "../../utils/validate";
import toast from "react-hot-toast";
import { CreateTodo, getAllMyTodos } from "../../services/todoServices";
import { useAppDispatch } from "../../store/store";

type Prop = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
export default function CreateTodoModal({ openModal, setOpenModal }: Prop) {
  const [submit, setSubmit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ITodo>({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  });

  const [formError, setFormError] = useState<ITodo>({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  });
  const onchange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formData.title) {
      setFormError({
        ...formError,
        title: validate("required", formData.title),
      });
    }
    if (formData.description) {
      setFormError({
        ...formError,
        description: validate("required", formData.description),
      });
    }
    if (formData.dueDate) {
      setFormError({
        ...formError,
        dueDate: validate("required", formData.dueDate),
      });
    }
    if (formData.priority) {
      setFormError({
        ...formError,
        priority: validate("required", formData.priority),
      });
    }
    setSubmit(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError({
      ...formError,
      title: validate("required", formData.title),
      description: validate("required", formData.description),
      dueDate: validate("required", formData.dueDate),
      priority: validate("required", formData.priority),
    });

    setSubmit(true);
  };

  useEffect(() => {
    if (
      (formError.description && submit) ||
      (formError.title && submit) ||
      (formError.dueDate && submit) ||
      (formError.priority && submit)
    ) {
      toast.error("Some filed are missing");
    }
  }, [formError, submit]);

  useEffect(() => {
    (async function () {
      if (
        submit &&
        formData.title &&
        formData.description &&
        formData.priority &&
        formData.dueDate &&
        !formError.title &&
        !formError.description &&
        !formError.dueDate &&
        !formError.priority
      ) {
        const data = await CreateTodo(formData);
        if (data) {
          toast.success("Todo created");
          setFormData({
            description: "",
            title: "",
            dueDate: "",
            priority: "",
          });
          setOpenModal(false);
          dispatch(getAllMyTodos());
        }
      }
    })();
  }, [submit, formData, formError, setOpenModal, dispatch]);

  return (
    <Modal
      show={openModal}
      onClose={() => {
        setFormData({
          title: "",
          description: "",
          priority: "",
          dueDate: "",
        });
        setFormError({
          title: "",
          description: "",
          priority: "",
          dueDate: "",
        });
        setOpenModal(false);
      }}
    >
      <Modal.Header>Edit Todo</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid gap-2 grid-cols-2">
          <div className="col-span-2 gap-2 flex flex-col">
            <label className="dark:text-gray-200" htmlFor="title">
              Title
            </label>
            <input
              onChange={onchange}
              value={formData.title}
              name="title"
              className={`rounded ${
                formError.title && "ring-1 ring-red-600"
              } dark:text-gray-200 dark:bg-gray-800 col-span-2`}
              type="text"
              placeholder="Title of the todo"
            />
          </div>
          <div className="flex gap-2 md:col-span-1 col-span-2 flex-col">
            <label className="dark:text-gray-200" htmlFor="title">
              Due Date
            </label>
            <input
              name="dueDate"
              onChange={onchange}
              value={formData.dueDate}
              className={`rounded ${
                formError.dueDate && "ring-1 ring-red-600"
              } dark:text-gray-200 dark:bg-gray-800 md:col-span-1 col-span-2`}
              type="date"
            />
          </div>
          <div className="flex gap-2 md:col-span-1 col-span-2 flex-col">
            <label className="dark:text-gray-200" htmlFor="title">
              Priority
            </label>
            <select
              name="priority"
              onChange={onchange}
              value={formData.priority}
              className={`rounded ${
                formError.priority && "ring-1 ring-red-600"
              } dark:text-gray-200 dark:bg-gray-800 md:col-span-1 col-span-2`}
            >
              <option value="">-select priority-</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high </option>
            </select>
          </div>
          <div className="col-span-2 gap-2 flex flex-col">
            <label className="dark:text-gray-200" htmlFor="title">
              Description
            </label>
            <textarea
              onChange={onchange}
              value={formData.description}
              name="description"
              className={`rounded ${
                formError.description && "ring-1 ring-red-600"
              } dark:text-gray-200 dark:bg-gray-800 col-span-2`}
            />
          </div>
          <button
            type="submit"
            className="col-span-2 mt-2 bg-cyan-700 text-gray-200 h-10 rounded-md"
          >
            CREATE
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

