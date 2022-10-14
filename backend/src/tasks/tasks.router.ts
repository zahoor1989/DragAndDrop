import express, { Request, Response } from 'express';
import * as TasksController from "./tasks.controller";

/**
 * Required External Modules and Interfaces
 */

/**
 * Router Definition
 */
 export const tasksRouter = express.Router();

/**
 * Controller Definitions
 */

// GET tasks
tasksRouter.get("/", async(req: Request, res:Response) => {
    try{
        const tasks = await TasksController.findAll();
        res.status(200).send(tasks);
    }catch(e:any){
        res.status(500).send(e.message);
    }
});

// GET task/:id
tasksRouter.get("/:id", async(req: Request, res: Response) => {
    try{
    const taskId = parseInt(req.params.id, 10);
    const task  = await TasksController.findTask(taskId);
    res.status(200).send(task);

    }catch(e:any){
        res.status(500).send(e.message)
    }
});

// POST task
tasksRouter.post("/createTask", async(req: Request, res: Response) => {
    try{
        if(req.body){
            await TasksController.creatingTask(req.body);
            const tasks = await TasksController.findAll();
            res.status(200).send(tasks);
        }else{
            res.status(200).send('No proper data provided'); 
        }
    }catch(e:any) {
        res.status(500).send(e.message)
    }
});

// Update task
tasksRouter.post("/updateTask", async(req: Request, res: Response) => {
    try{
        if(req.body) {
            const { id } = req.body;
            const taskData = {
                category: req.body.category,
                updatedBy:req.body.updatedBy ? req.body.updatedBy : "Zahoor Ahmed" 
            }
            const tasks = await TasksController.updatingTask(id, taskData);
            res.status(200).send(tasks);
        }else{
            res.status(200).send('No proper data provided'); 
        }
    }catch(e:any) {
        res.status(500).send(e.message)
    }
});
