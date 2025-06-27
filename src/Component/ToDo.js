import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const ToDo = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [task, setTask] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (task) {
            if (editingIndex !== null) {
                const updatedTasks = [...tasks];
                updatedTasks[editingIndex] = task;
                setTasks(updatedTasks);
                setEditingIndex(null);
            } else {
                setTasks([...tasks, task]);
            }
            setTask("");
        }
    };

    const editTask = (index) => {
        setTask(tasks[index]);
        setEditingIndex(index);
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="todos">
            <div className='col-md-4 offset-md-4'>
                <h1 className='roboto_light pt-2'>todos</h1>
                <input
                    type="text"
                    className='form-control'
                    placeholder="Enter a task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <div className='d-grid mt-2'>
                    <button onClick={addTask} className='btn btn-primary'>{editingIndex !== null ? "Update Task" : "Add Task"}</button>
                </div>
                <ul className='list-group mt-2'>
                    {tasks.map((t, index) => (
                        <li key={index} className='list-group-item list-group-item-action'>
                            <div className="float-start">{t}</div>
                            <div class="float-end">
                                <button onClick={() => editTask(index)} className='btn'><FontAwesomeIcon icon={faPenToSquare} /></button>
                                <button onClick={() => deleteTask(index)} className='btn'><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToDo;