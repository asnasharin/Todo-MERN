import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAllMytodos } from "../../servieces/todoServiece";
import { IMyTodos, Itodo } from "../../types/todoTypes";
import TodoCard from "../../components/TodoCard/TodoCard";
import { Progress } from "flowbite-react";
import NewCheckBox from "../../components/NewCheckBox/NewCheckBox";
import Drawor from "../../components/Drawer/Drawor";

export default function HomePage() {
  const [currentTodo, setCurrentTodo] = useState<IMyTodos | undefined>();
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state) => state.todo);
  const [progress, setProgress] = useState<number>(0);

  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    dispatch(getAllMytodos());
  }, [dispatch]);

  // sort based on priority
  useEffect(() => {
    if (sort === "priority" && currentTodo && todos) {
      const todo = todos?.find((e) => e._id === currentTodo?._id);
      if (todo) {
        const sortedTodo = [...todo.todos].sort((todo1, todo2) => {
          const priorityOrder: {
            high: number;
            medium: number;
            low: number;
          } = {
            high: 2,
            medium: 1,
            low: 0,
          };

          const priorityValue1 =
            (priorityOrder as { [key: string]: number })[todo1.priority] || 0;
          const priorityValue2 =
            (priorityOrder as { [key: string]: number })[todo2.priority] || 0;

          return priorityValue2 - priorityValue1;
        });
        setCurrentTodo({
          ...currentTodo,
          todos: sortedTodo,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    if (sort === "createdAt" && currentTodo && todos) {
      const todo = todos.find((e) => e._id === currentTodo._id);
      if (todo) {
        const sortedTodos = [...todo.todos].sort((todo1, todo2) => {
          // Parse createdAt strings into Dates for comparison
          const date1 = new Date(todo1.createdAt as string);
          const date2 = new Date(todo2.createdAt as string);
          const timeDifference = date2.getTime() - date1.getTime();
          return timeDifference;
        });

        setCurrentTodo({
          ...currentTodo,
          todos: sortedTodos,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    if (currentTodo) {
      setCurrentTodo(todos?.find((e) => e._id === currentTodo?._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  useEffect(() => {
    if (todos) {
      setCurrentTodo(todos[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showCompleted && currentTodo) {
      setCurrentTodo({
        ...currentTodo,
        todos: currentTodo?.todos.filter((e) => e.isCompleted !== true),
      });
    } else if (currentTodo && todos) {
      setCurrentTodo({
        ...currentTodo,
        todos: todos?.find((e) => e._id === currentTodo._id)
          ?.todos as unknown as Itodo[],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCompleted]);

  useEffect(() => {
    if (currentTodo) {
      let count = 0;
      for (let i = 0; i < currentTodo.todos.length; i++) {
        if (currentTodo.todos[i].isCompleted === true) {
          count += 1;
        }
      }
      setProgress((count / currentTodo.todos.length) * 100);
    }
  }, [currentTodo]);

  return (
    <>
      <NavBar setOpenDrawer={setOpenDrawer} />
      <Drawor
        openDrawer={openDrawer}
        setCurrentTodo={setCurrentTodo}
        setOpenDrawer={setOpenDrawer}
      />
      <div className="pt-16 h-screen grid grid-cols-12">
        <div className="col-span-3 hidden md:inline-block">
          <SideBar setCurrentTodo={setCurrentTodo} />
        </div>
        <div className="md:col-span-9 col-span-12 bg-white max-h-full overflow-y-scroll text-white dark:bg-gray-950/[0.8]">
          <div className="flex mt-28 sm:mt-20 min-h-full flex-col">
            {currentTodo && (
              <>
                <div className="md:w-[75%] w-[100%] flex-wrap flex items-center px-5 pb-2 fixed border-b-2 bg-gray-200/[0.4] border-gray-300 justify-between dark:border-gray-800 dark:bg-gray-950/[0.6] backdrop-blur-sm top-16 z-50 h-28 md:h-16 ">
                  <div className="w-96 ps-4 text-gray-900 dark:text-gray-200">
                    <Progress
                      progressLabelPosition="inside"
                      textLabel="Progress"
                      textLabelPosition="outside"
                      size="lg"
                      labelProgress
                      labelText
                      progress={progress}
                      color="cyan"
                    />
                  </div>
                  <div
                    className="p-3 md:w-52 w-15 cursor-pointer flex pt-6"
                    onClick={() => setShowCompleted((e) => !e)}
                  >
                    <NewCheckBox checked={showCompleted} />
                    <h1 className="ms-3 text-gray-900 dark:text-gray-200">
                      Show Completed
                    </h1>
                  </div>
                  <div>
                    <select
                      name="sort"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className={`rounded md:w-44 w-20 me-5 mt-3 text-gray-800 dark:text-gray-200 dark:bg-gray-800 py-1`}
                    >
                      <option value="">-sort-</option>
                      <option value="priority">SortBy: priority</option>
                      <option value="createdAt">SortBy:Created At</option>
                    </select>
                  </div>
                </div>
              </>
            )}
            {currentTodo &&
              currentTodo.todos.map((e) => (
                <>
                  <div className="flex px-3 md:px-10 py-2 overflow-auto flex-col ">
                    <TodoCard
                      description={e.description}
                      dueDate={e.dueDate}
                      priority={e.priority}
                      title={e.title}
                      isCompleted={e.isCompleted}
                      _id={e._id}
                      setCurrentTodo={setCurrentTodo}
                      currentTodo={currentTodo}
                      todos={currentTodo.todos}
                    />
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
