import React from 'react';

const formStyle = {
    backgroundColor:"#ffee22",
    padding: "15px",
    borderRadius:"15px",
    marginTop:"10px"
    }
interface TaskTypes {
    createTask: Function;
}

const AddTask: React.FC<TaskTypes> = ({ createTask}) =>  {
    const [state, setState] = React.useState({
        name: "",
        description: "",
        bgColor: "#eeff22",
        category: "todo",
        createdBy:""
      });

    const handleChange = (evt:any) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    const creatTaskHandler = (e:any) => {
        e.preventDefault();
        createTask(state);
    };

return (
    <div className="container" style={formStyle}>
        <form onSubmit={(e) => creatTaskHandler(e)}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Task Title</label>
            <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={state.name} aria-describedby="name" />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" name="description" onChange={handleChange} value={state.description} id="description" aria-describedby="description" />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Backgroun Color</label>
            <input type="color" className="form-control" name="bgColor" onChange={handleChange} value={state.bgColor} id="bgColor" aria-describedby="bgColor" />
        </div>
        <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select className="form-control form-select" aria-label="category" name="category" onChange={handleChange} value={state.category}>
            <option selected value="todo">To Do</option>
            <option value="wip">In Progress</option>
            <option value="qa">In QA</option>
            <option value="complete">Completed</option>
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="CreatedBy" className="form-label">Created By</label>
            <input type="text" className="form-control" id="CreatedBy" aria-describedby="CreatedBy" name="createdBy" onChange={handleChange} value={state.createdBy} />
        </div>
        <button className="btn btn-primary">Submit</button>
        </form>
    </div>
    )
}

export default AddTask;