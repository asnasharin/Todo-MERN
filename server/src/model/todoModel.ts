import mongoose, {Schema, model} from "mongoose";

const todoSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, reequired: true},
    userId: {type: mongoose.Types.ObjectId, required: true},
    dueData: { type: Date, required: true},
    priority: { type: String, required: true},
    isCompleted: { type: Boolean, required: true},
},
{
    timestamps: true
})

const Todo = model("Todo", todoSchema);
export default Todo; 