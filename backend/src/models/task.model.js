import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    description:{
        type: String,
        required: true,
    },
    working:{
        type: String,
        required: true,
        enum: ['active','inactive'],
        default: 'active'
    },
    dueDate:{
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['To-do', 'In Progress', 'Testing', 'Done'],
        default: 'To-do',
    },
},{ timestamps: true });


const Task = mongoose.model('Task', taskSchema);

export default Task;