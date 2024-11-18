import { NextFunction, Request, Response } from "express";
import Todo from "../model/todoModel";

/**
 * @desc     Create todo
 * @route    POST /api/todo
 * @access   private
 */

export const createTodo = (
    async (req: Request, res: Response, next: NextFunction) => {
        const { description, priority, dueDate, title } = req.body
        const newTodo = await Todo.create({
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            userId: req.user ? req.user._id : "",
        })
        if (newTodo) {
            res.status(200).json({
              success: true,
              message: "todo created successfully",
              todo: newTodo,
            });
        }
    }
)

/**
 * @desc     delete todo
 * @route     DELETE/api/todo/:id
 * @access   private
 */

export const deleteTodo = (
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        const todoDelete = await Todo.findOneAndDelete({ id: id })

        if (todoDelete) {
            res.status(200).json({
              success: true,
              message: "Todo deleted successfully",
            });
          }
    }   
)

/**
 * @desc     edit todo
 * @route    PUT/api/todo:id
 * @access   private
 */

export const editTodo = (
    async(req: Request, res: Response) => {
        const { id, title, description, dueDate, priority} = req.params

        const todo = await Todo.findOneAndUpdate(
            { id: id},
            {
                title: title,
                description: description,
                dueDate: dueDate,
                priority: priority
            }, 
            {
                new: true
            }
        )

        if (todo) {
            res.status(200).json({
                success: true,
                message: "todo edited successfully",
                todo: todo
            })
        }
    }
)


/**
 * @desc      update todo
 * @route    PATCH/api/todo:id
 * @access   private
 */

export const updateTodo = (
    async (req:Request, res:Response) => {
       const {id} = req.params
       const { isCompleted } = req.body

       const updateTodo = await Todo.findOneAndUpdate(
        { id: id},
        { isCompleted: isCompleted},
        { new: true}
    )
    if (updateTodo) {
        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            todo: updateTodo
        })
    }
    }
)


/**
 * @desc      fetching all todo
 * @route    GET/api/todo
 * @access   private
 */

export const getTodo = (
    async (req: Request, res: Response ) => {
        const userId = req.user?._id
        const todo = await Todo.aggregate([
            {
                $match: {
                    userId: userId
                },
            }, 
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$dueDate"}},
                    todo: { $push: "$$ROOT"}
                },
            },
            {
                $sort: { _id: 1},
            },
        ]);
        if (todo) {
            res.status(200).json({
                success: true,
                todo
            })
        } else {
            res.status(500).send({
                success: false,
                message: "internal server error"
            })
        }
    }
)

