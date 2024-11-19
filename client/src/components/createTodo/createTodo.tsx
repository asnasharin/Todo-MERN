import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ITodo } from "../../types/todoTypes";
import { validate } from "../../utils/validate";
import { toast } from "react-toastify";
import { CreateTodo } from "../../services/todoServices";


type Prop = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
export default function CreateTodoModal({ openModal, setOpenModal }: Prop) {
  const [submit, setSubmit] = useState<boolean>(false);
  const [formData, setFormData] = useState<ITodo>({
    title: "",
    description: "",
    dueDate: "",
    priority: ""
  });

  const [formError, setFormError] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: ""
  })


  const onchange = (e: React.ChangeEvent<HTMLInputElement | 
    HTMLTextAreaElement | HTMLSelectElement >
  ) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })

    if (formData.title) {
      setFormError({
        ...formError,
        title: validate("required", formData.title)
      })
    }
      if (formData.description) {
        setFormError({
          ...formError,
          description: validate("required", formData.description)
        })
      }
      if (formData.dueDate) {
      setFormError({
        ...formError,
        dueDate: validate("required", formData.dueDate)
      })
     }
      if (formData.priority) {
        setFormError({
          ...formError,
          priority: validate("required", formData.priority)
      })
    }
    setSubmit(false) 
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError({
      ...formError,
      title: validate("required", formData.title),
      description: validate("required", formData.description),
      dueDate: validate("required", formData.dueDate),
      priority: validate("required", formData.priority)
    })
    setSubmit(true)
  }

  useEffect(() => {
    if (
      (formError.title && submit) ||
      (formError.description && submit) ||
      (formError.priority && submit) ||
      (formError.dueDate && submit) 
    ) {
      toast.error("fields are missing")
    }
  }, [formError, submit])

  // useEffect(() => {
  //   (async function() {
  //     if (
  //     submit &&
  //     formData.title &&
  //     formData.description &&
  //     formData.dueDate &&
  //     formData.priority &&
  //     !formError.title &&
  //     !formError.description &&
  //     !formError.dueDate &&
  //     !formError.priority 
  //     ) {
  //       const data = await CreateTodo(formData)
  //       if (data) {
  //         toast.success("Todo created")
  //         setFormData({
  //           description: "",
  //           title: "",
  //           dueDate: "",
  //           priority: ""
  //         });
  //         setOpenModal(false)
          
  //       }
  //     }
  //   })
  // }, [submit, formData, formError, setOpenModal])

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
          // dispatch(getAllMytodos());
        }
      }
    })();
  }, [submit, formData, formError, setOpenModal]);


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
        <form  onSubmit={handleSubmit} className="grid gap-2 grid-cols-2">
          <div className="col-span-2 gap-2 flex flex-col">
            <label className="dark:text-gray-200" htmlFor="title">
              Title
            </label>
            <input
            onChange={onchange}
            value={formData.title}
              name="title"
              type="text"
              placeholder="Title of the todo"
            />
          </div>
          <div className="flex gap-2 md:col-span-1 col-span-2 flex-col">
            <label className="dark:text-gray-200" htmlFor="title">
              Due Date
            </label>
            <input
            onChange={onchange}
            value={formData.dueDate}
              name="dueDate"
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
            />
          </div>
          <button
            type="submit"
            className="col-span-2 mt-2 bg-purple-900 text-gray-200 h-10 rounded-md"
          >
            CREATE
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
