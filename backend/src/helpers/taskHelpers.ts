import * as fs from 'fs';
import * as path from 'path';
import { Task } from '../tasks/task.interface';
import { Tasks } from '../tasks/tasks.interface';




//reading file 
export const readJsonFromFile = async (): Promise<Task[]| undefined>  => {
    try {
    let tasks: Task[];
    let data = await fs.readFileSync(path.join(__dirname, '../../assets/todos.json'));
    tasks = JSON.parse(data.toString());
    if(!tasks.length) {
        return [];
    }
    return tasks;
    } catch(error) {
        console.log(error)
    }
  }
  
// writting file
export const writeJsonToFile = async (tasks:Task[]) => {
    try {
    await fs.promises.writeFile(path.resolve('assets/todos.json'), JSON.stringify(tasks));
    } catch(error) {
        console.log(error)
    }
  }
  



