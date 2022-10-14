export interface BaseTask {
    title: string;
    description: string;
    status: string;
};


//exporting item by extending the interface
export  interface Task extends BaseTask {
id: number;
}