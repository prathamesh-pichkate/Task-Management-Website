import Task from "../models/task.model.js"
import {validateCreateTask, validateUpdateTask,validateUpdateTaskStatus} from "../utils/validation.js"
import logger from "../utils/logger.js";

// Create a new task
const createTask = async (req, res) => {
    logger.info('Creating a new task api endpoint hits...');
    try {
        const {error} = validateCreateTask(req.body);
        if (error){
            return res.status(400)
            .json({
                success: false,
                 message: `Create Task validation error ${error.details[0].message}`
            });
        }
        const { title, description, dueDate } = req.body;

        const task = new Task({
             title, 
             description, 
             dueDate 
        });
        await task.save();
        logger.info('Task created successfully');

        res.status(201)
        .json({ 
            success: true, 
            message: 'Task created successfully', task 
        });
    } catch (error) {
       logger.error(`Error creating task: ${error.message}`);
        res.status(500)
        .json({ 
            success: false, 
            message:`Error creating task: ${error.message}`
        });
    }
};

// Get all tasks
const getTasks = async (req, res) => {
    logger.info('Get all tasks api endpoint hits...');
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200)
        .json({ 
            success: true, 
            message: 'Tasks retrieved successfully',
            tasks 
        });
    } catch (error) {
        logger.info(`Error getting tasks: ${error.message}`);
        res.status(500)
        .json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
    logger.info('Get a single task by ID api endpoint hits...');
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        logger.info('Task retrieved successfully');
        res.status(200).json({
             success: true, 
             message: 'Task retrieved successfully',
             task 
        });
    } catch (error) {
        logger.error(`Error getting task: ${error.message}`);
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
};

// Update task details
const updateTask = async (req, res) => {
    logger.info('Update task details api endpoint hits...');
    try {
        const {error} = validateUpdateTask(req.body);

        if (error){
            return res.status(400)
            .json({
                success: false,
                 message: `Update Task validation error ${error.details[0].message}`
            });
        }

        const { title, description, dueDate } = req.body;

        const task = await Task.findByIdAndUpdate(req.params.id, 
            { title, description, dueDate }, 
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Task updated successfully', 
            task 
        });
    } catch (error) {
        logger.error(`Error updating task: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update task status (Drag and Drop)
const updateTaskStatus = async (req, res) => {
    logger.info('Update task status api endpoint hits...');
    try {
        const {error} = validateUpdateTaskStatus(req.body);
        if (error){
            return res.status(400)
            .json({
                success: false,
                 message: `Update Task Status validation error ${error.details[0].message}`
            });
        }
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, 
            { status }, 
            { new: true}
        );

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Task status updated successfully',
            task
            });
    } catch (error) {
        logger.error(`Error updating task status: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Toggle task working status
const toggleTaskWorking = async (req, res) => {
    logger.info("Toggle task working status API endpoint hit...");

    try {
        // Ensure only logged-in users can update
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Please log in",
            });
        }

        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        // Toggle the 'working' status
        task.working = task.working === "active" ? "inactive" : "active";
        await task.save();

        logger.info(`Task working status updated successfully by user: ${req.user._id}`);

        res.status(200).json({
            success: true,
            message: "Task working status updated",
            working: task.working, // Return updated status
        });
    } catch (error) {
        logger.error(`Error toggling task working status: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    logger.info('Delete a task api endpoint hits...');
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting task: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};


export {createTask,getTasks,getTaskById,updateTask,updateTaskStatus,toggleTaskWorking,deleteTask};