import React from 'react';

interface HeaderTypes {
    showForm: Function;
    show: boolean;
}

const Header: React.FC<HeaderTypes> = ({ showForm, show }) =>  {
    const onclickHandler = (e:any) => {
        showForm();
    };

return (
    <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid text-center">
                <div className="navbar-brand text-center">{!show? 'DRAG & DROP DEMO': 'Add Task'}</div>
                <div className="collapse navbar-collapse" id="navbarScroll">
                <div className="d-flex">
                    <button className="btn btn-outline-success" onClick={() => onclickHandler(show)}>{!show ? 'Add Task' : 'Task Board'}</button>
                </div>
                </div>
            </div>
        </nav>
    </div>
    )
}

export default Header;