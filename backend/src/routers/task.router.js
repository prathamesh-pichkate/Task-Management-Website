import express from "express";
import {createTask,getTasks,getTaskById,updateTask,updateTaskStatus,toggleTaskWorking,deleteTask} from "../controllers/task.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post('/create-task',verifyJWT, createTask);
router.get('/get-tasks',verifyJWT, getTasks);
router.get('/get-task/:id',verifyJWT, getTaskById);
router.put('/:id',verifyJWT, updateTask);
router.put('/:id',verifyJWT,updateTaskStatus);
router.put('/:id',verifyJWT,toggleTaskWorking);
router.delete('/:id',verifyJWT,deleteTask);

export default router;