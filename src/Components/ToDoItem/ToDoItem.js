import React, { useState } from 'react';
import './tasks.css';
import bin from './images/bin.png';
import move from './images/move.png';




function ToDoItem() {
    const [addModalOpen, setModalOpen] = useState(false);
    const [toDoModalOpen, setToDoModalOpen] = useState(false);
    const [selectedCoordinates, setSelectedCoordinates] = useState({ x: 0, y: 0 });
    const [selectedToDoIndex, setSelectedToDoIndex] = useState(null);
    const [filter, setFilter] = useState("todo");
    
    const [todosData, setTodosData] = useState(
        [
            {
                description: 'Write Essay',
                completed: false,
                deleted: false
            },
            {
                description: 'One Hour CSS Course Online',
                completed: false,
                deleted: false
            },
            {
                description: 'Buy One Way Tickets to San Fransico',
                completed: false,
                deleted: false
            },
            {
                description: 'Go to Gym',
                completed: false,
                deleted: false
            },
            {
                description: 'Buy Groceries',
                completed: false,
                deleted: false
            },
        ]
    );

    const addTasks = description => {
        setTodosData([...todosData,{description, completed:false, deleted:false}]);
    };

    const completedTasks = index => {
        const newTodosData = [...todosData];
        newTodosData[index].completed = true;
        setTodosData(newTodosData);
    };

    const deletedTasks = index => {
        const newTodosData = [...todosData];
        newTodosData[index].deleted = true;
        setTodosData(newTodosData);
    };

    const uncompletedTasks = index => {
        const newTodosData = [...todosData];
        newTodosData[index].completed = false;
        setTodosData(newTodosData);
    };

    const restoredTasks = index => {
        const newTodosData = [...todosData];
        newTodosData[index].deleted = false;
        setTodosData(newTodosData);
    };

    const tasksToTrash = index => {
        const newTodosData = [...todosData];
        newTodosData.splice(index, 1);
        setTodosData(newTodosData);
    };

    const filteredTasks = todosData.filter(todo => {
        if (filter === "todo") return !todo.deleted
        if (filter === "done") return todo.completed && !todo.deleted;
        if (filter === "trash") return todo.deleted;
        return true;
    });

    const handleFilter = filter => {
        setFilter(filter);
    };

    const toggleModal = () => {
        setModalOpen(!addModalOpen)
    }

    const toggleToDoModal = (event, index) => {
        setSelectedCoordinates({
            x: event.target.offsetLeft,
            y: event.target.offsetTop,
        });
        setSelectedToDoIndex(index);
        setToDoModalOpen(!toDoModalOpen);
    }

    return (
        <div className='wrapper'>
            <div className='buttons'>
                <div className='taskButtons'>
                    <button className={filter === "todo" ? "active" : "notActive"}
                    onclick={() => handleFilter("todo")}>To Do</button>

                    <button className={filter === "done" ? "active" : "notActive"}
                    onclick={() => handleFilter('done')}>Done</button>

                    <button className={filter === "trash"? "active" : "notActive"}
                    onclick={() =>handleFilter("trash")}>Trash</button>
                </div>
                <div className='add'>
                    <button className="plus" onClick={toggleModal}> </button>
                    {addModalOpen && (
                        <div className="modal">
                            <p>Add New To Do</p>
                            <form onSubmit={e => {
                                e.preventDefault(); 
                                addTasks(e.target.todoInput.value);
                                e.target.todoInput.value = "";
                                toggleModal();
                            }}>
                                <textarea className="input" placeholder="Your text" type="text" name="todoInput" />
                                <button className="modalPlus" type="submit">Add</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>  
            <h1 style={{fontSize: 24, marginTop: 64, marginBottom: 24}}>{(filter === "todo") ? "To Do" : (filter === "done") ? "Done" : (filter === "trash") ? "Trash" : "Я не знаю такой раздел!"}</h1>
            <hr style={{background: "#151517", opacity: 0.2, height: 2, marginBottom: 24}}></hr>
            <div>
                {filteredTasks.map((todo, index) => (
                    <div className="tasks" key={index}>
                        <button className="modalButton" onClick={(event) => toggleToDoModal(event, index)}></button>
                        {toDoModalOpen && selectedToDoIndex === index && (
                            <div className="toDoModal" style={{
                                position: 'absolute',
                                top: selectedCoordinates.y,
                                left: selectedCoordinates.x,
                              }}>
                                {!todo.deleted && (
                                    <button className='modalButton2' onClick={() => deletedTasks(index)}><img src={bin} alt='img'/>Move to Trash</button>
                                )}
                                {todo.deleted && (
                                    <>
                                        <button className='modalButton2' onClick={() => tasksToTrash(index)}><img src={bin} alt='img' />Delete Forever</button>
                                        <button className='modalButton2' onClick={() => restoredTasks(index)}><img src={move} alt='img' />Move Back To To Do</button>
                                    </>
                                )}
                            </div>
                        )}
                        <div className="checkBox">
                        <input type="checkbox"
                            checked={todosData[index].completed}
                            onChange={() => {
                                if (todosData[index].completed) {
                                uncompletedTasks(index);
                                } else {
                                completedTasks(index);
                                }
                            }}/>
                            <label for="completedCheckbox"></label>
                        </div>
                        <p style={{textDecoration: todo.completed ? "line-through" : "none"}}>{todo.description}</p>
                    </div>
                ))}
            </div>
        </div>        
    )
}

export default ToDoItem;