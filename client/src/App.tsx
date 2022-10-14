
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./styles.css";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TasksService from "./Services/TasksService";

interface taskTypes {
  id:number;
  name: string;
  description: string;
  category: string;
  createdBy:string;
}


export default function AppDragDropDemo() {
  const initalTasks:taskTypes[] = [];
  const [tasks, setTasks] =  useState(initalTasks);
  const [show, setShow] =  useState(false);

  // fetch data from node 
  useEffect(()=>{
    TasksService.getAllTasks().then((result:any) => {
      const { data } = result;
      if(data){
        setTasks(data)
      }
    })
  },[show])

    const onDragStart = (ev:any, id:any) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    const onDragOver = (ev:any) => {
        ev.preventDefault();
    }

    const onDrop = (ev:any, cat:any) => {
       let id = ev.dataTransfer.getData("id");
      let filteredTasks:taskTypes[] = tasks.map((task:any) => {
           if (task.name === id) {
               task.category = cat;
           }
           return task;
       });
       setTasks(filteredTasks);
       let droppedTask = tasks.find((task:any) => (task.name === id))
       TasksService.updateTask(droppedTask).then((result) => {
              const { data } = result;
              if(data){
                setTasks(data);
              }
       })
    }

    const displayForm = () => {
      setShow(!show);
    }
    const createTask = (formVals:taskTypes) => {
      TasksService.createTask(formVals).then(result => {
        const { data } = result;
        if(data) {
          setTasks(data);
          setShow(false)
        }
      })
    };


    const todoList:any = {
      todo:[],
      wip:[],
      qa:[],
      complete:[]
    };

    tasks.forEach ((t:any) => {
      if(todoList[t.category]){
        todoList[t.category].push(
            <div key={t.name} 
                onDragStart = {(e) => onDragStart(e, t.name)} draggable className="draggable" style = {{backgroundColor: t.bgcolor}}>
                {t.name}
            </div>
        );
      }
    });


    return (
      <div className="container-fluid">
         <div className="header"> 
          <Header  showForm={displayForm} show={show} />
          </div>
          {!show?
          (
            <section className="tasks-container">
              <div className="container-drag d-flex justify-content-center">
                      <div className="todo" onDragOver={(e)=> onDragOver(e)} onDrop={(e)=> onDrop(e, "todo")}>
                          <span className="task-header">To DO</span>
                          {todoList.todo}
                      </div>
                      <div className="wip" onDragOver={(e)=> onDragOver(e)} onDrop={(e)=> onDrop(e, "wip")}>
                          <span className="task-header">InProgress</span>
                          {todoList.wip}
                      </div>
                      <div className="inqa" onDragOver={(e)=> onDragOver(e)} onDrop={(e)=> onDrop(e, "qa")}>
                          <span className="task-header">InQA</span>
                          {todoList.qa}
                      </div>
                      <div className="droppable" onDragOver={(e)=> onDragOver(e)} onDrop={(e)=> onDrop(e, "complete")}>
                            <span className="task-header">COMPLETED</span>
                            {todoList.complete}
                      </div>
              </div>
            </section>
          ) : (
            <section className="form-container">
              <AddTask createTask={createTask} />
            </section>
          )
        }
      </div>
    );
}