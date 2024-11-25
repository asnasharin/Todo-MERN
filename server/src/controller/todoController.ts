import { NextFunction, Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import Todo from "../model/todoModel";
import { IUser } from "../model/userModel";

/**
 * @disc    create todo
 * @route   POST /api/todo
 * @access  private
 */
export const createTodo: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { description, dueDate, title, priority } = req.body;
    const newTodo = await Todo.create({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      userId: req.user ? req.user._id : "",
    });
    if (newTodo) {
      res.status(200).json({
        success: true,
        message: "todo created successfully",
        todo: newTodo,
      });
    }
  }
);

/**
 * @disc    create todo
 * @route   PUT /api/todo/:id
 * @access  private
 */
export const editTodo: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { description, dueDate, title, priority } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
      },
      {
        new: true,
      }
    );
    if (updatedTodo) {
      res.status(200).json({
        success: true,
        message: "todo updated successfully",
        todo: updatedTodo,
      });
    }
  }
);

/**
 * @disc    delete todo
 * @route   DELETE /api/todo/:id
 * @access  private
 */
export const deleteTodo: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const deleteTodo = await Todo.findOneAndDelete({ _id: req.params.id });
    if (deleteTodo) {
      res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
      });
    }
  }
);

/**
 * @disc    update completed
 * @route   PATCH /api/todo/:id
 * @access  private
 */
export const updateCompleted: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const todo = await Todo.findOne({ _id: req.params.id });
    if (!todo) {
      res.status(404);
      next(Error("Todo not found"));
    } else {
      const updateTodo = await Todo.findOneAndUpdate(
        { _id: req.params.id },
        { isCompleted: !todo.isCompleted }
      );
      if (updateTodo) {
        res.status(200).json({
          success: true,
          message: "todo updated successfully",
        });
      }
    }
  }
);
