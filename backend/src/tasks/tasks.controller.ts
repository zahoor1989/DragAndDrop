// src itmes.service.ts
import { BaseTask, Task } from "./task.interface";
import * as TaskHelper from "../helpers/taskHelpers";

/*
* Service methods
*/
// find all items
export const findAll = async () => {
  let tasks = await TaskHelper.readJsonFromFile();
  return tasks;
}; 

// finding an item by id
export const findTask = async (id:number): Promise<Task| null>  => {
  let task:any;
  let tasks = await TaskHelper.readJsonFromFile();
  if(tasks){
    task = tasks.find((tsk) => (tsk.id === Number(id)) || (tsk.id === id));
  }
  if(!task) return null;
  return task;
}

//creating an item 
export const creatingTask = async (newTask: BaseTask): Promise<Task[]> => {
    const id = new Date().valueOf();
    let task = {
        id, 
        ...newTask
    };
  let tasks:any;
  tasks = await TaskHelper.readJsonFromFile();
  tasks.push(task);
  // write the file again.
  await TaskHelper.writeJsonToFile(tasks);
    return tasks;
}

//udating the existing item
export const updatingTask = async (id:number, taskUpdate:any): Promise<Task | null> => {
    // getting the existing item
    let task = await findTask(Number(id));
    // not found
    if(!task) return null;
    task.id = Number(id);
    task = {
      ...task,
      ...taskUpdate
    }
    let tasks:any= await findAll();
    // remove update one 
    tasks = tasks.filter((tsk:Task) => tsk.id !== Number(id));
    tasks = [task, ...tasks];

    // after update write in the file 
    await TaskHelper.writeJsonToFile(tasks);

    // return the found item
    return tasks;
};


// removing an item
export const remove = async (id:number): Promise<null | boolean> => {
    const task = await findTask(id);

    if(!task) return null;
    let tasks:any= await findAll();
    tasks = tasks.filter((tsk:any) => tsk.id !== Number(id));
    return true
}