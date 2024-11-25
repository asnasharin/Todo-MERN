import { Itodo } from "../../types/todoTypes";
import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { validate } from "../../utils/FormValidate";
import toast from "react-hot-toast";
import { getAllMytodos, editMyTodo } from "../../servieces/todoServiece";
import { useAppDispatch } from "../../redux/store";

type IeditTodo = {
  editTodo: Itodo | undefined;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function EditTodoMdal({
  editTodo,
  openModal,
  setOpenModal,
}: IeditTodo) {
  const [submit, setSubmit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Itodo>({
    description: editTodo ? editTodo.description : "",
    dueDate: editTodo ? editTodo.dueDate : "",
    priority: editTodo ? editTodo.priority : "",
    title: editTodo ? editTodo.title : "",
  });

  useEffect(() => {
    if (editTodo) {
      setFormData(editTodo);
    }
  }, [editTodo]);

  const [formError, setFormError] = useState<Itodo>({
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
        !formError.priority &&
        editTodo
      ) {
        const data = await editMyTodo(formData, editTodo._id as string);
        if (data) {
          toast.success("Todo updated");
          setFormData({
            description: "",
            title: "",
            dueDate: "",
            priority: "",
          });
          setOpenModal(false);
          dispatch(getAllMytodos());
          setSubmit(false);
        }
      }
    })();
  }, [submit, formData, formError, setOpenModal, dispatch, editTodo]);

  return (
    <>
      {editTodo && (
        <>
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
            <Modal.Header>Create Todo</Modal.Header>
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
                    <option value={formData.priority}>
                      {formData.priority}
                    </option>
                    {formData.priority !== "low" && (
                      <option value="low">{formData.priority}</option>
                    )}
                    {formData.priority !== "medium" && (
                      <option value="medium">{formData.priority}</option>
                    )}
                    {formData.priority !== "high" && (
                      <option value="high">{formData.priority}</option>
                    )}
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
                  className="col-span-1 mt-2 bg-cyan-700 text-gray-200 h-10 rounded-md"
                >
                  UPDATE
                </button>
                <button
                  type="reset"
                  onClick={() => setFormData(editTodo)}
                  className="col-span-1 mt-2 bg-gray-700 dark:bg-gray-600 text-gray-200 h-10 rounded-md"
                >
                  RESET
                </button>
              </form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}