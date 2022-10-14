import axios from './common';

// getting all tasks
const getAllTasks = ()  => {
        return axios.get('tasks/');
    };

// creating task
const createTask = (taskData:any)  => {
    return axios.post('tasks/createTask', taskData);
    };

// creating task
const updateTask = (taskData:any)  => {
    return axios.post('tasks/updateTask', taskData);
};




const TasksService = { 
    getAllTasks, 
    createTask,
    updateTask
};
export default TasksService;