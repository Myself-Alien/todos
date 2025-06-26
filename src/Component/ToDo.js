import React, { useState, useEffect } from 'react';

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
            <h1>todos</h1>
            <input
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={addTask}>{editingIndex !== null ? "Update Task" : "Add Task"}</button>
            <ul>
                {tasks.map((t, index) => (
                    <li key={index}>
                        {t} <button onClick={() => editTask(index)}>Edit</button> <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDo;