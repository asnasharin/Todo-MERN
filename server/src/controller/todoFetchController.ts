import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Todo from "../model/todoModel";

/**
 * @desc    Fetching all todo
 * @route   GET /api/todo
 * @access  private
 */
export const getTodos = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const todos = await Todo.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$dueDate" } },
          todos: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    if (todos) {
      res.status(200).json({
        todos,
      });
    } else {
      res.status(500);
      next(Error("Internal server Error"));
    }
  }
);
