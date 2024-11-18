import { Router } from "express"
import { protect } from "../middleware/authMiddleware"
import { createTodo, deleteTodo, editTodo, getTodo, updateTodo } from "../controller/todoController"

const route: Router = Router()

route.post("/", protect, createTodo)
.get("/", protect, getTodo)

route
   .route("/:id")
   .put(protect, editTodo)
   .patch(protect, updateTodo)
   .delete(protect, deleteTodo)
export default route