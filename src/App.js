// client/src/App.js
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';

function App() {
  // données, State
  const [tasks, setTasks] = useState([
    {id:1, name:"meditation", completed:false},
    {id:2, name:"sport", completed:true}
  ]);
  // cmpts

  //---------------------------
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);
  //---------------------------
  const handleCompleted = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed};
      }
      return task;
    })
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleAdd = () => {
    const newTask = {
      id: tasks.length + 1,
      name: document.getElementById("TaskTextarea").value,
      completed: false
    };
    const tasksUpdated = ([...tasks, newTask])
    setTasks(tasksUpdated);
    localStorage.setItem('tasks', JSON.stringify(tasksUpdated));
  };

  const handleDelete = (taskId) => {
    const tasksUpdated = tasks.filter(task => task.id !== taskId);
    setTasks(tasksUpdated);
    localStorage.setItem('tasks', JSON.stringify(tasksUpdated));
  };
  
  // Affichage
  return (
    <div className="app-container">
      <h1 className="app-title">Tasks List</h1>
      <ul className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <li className={`task-name ${task.completed ? 'completed' : ''}`}>
              {task.name}
            </li>
            <div className="task-actions">
              <input
                type="checkbox"
                className="task-checkbox"
                onChange={() => handleCompleted(task.id)}
                checked={task.completed}
              />
              <button
                className="delete-button"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
      <div className="add-task-container">
        <label htmlFor="TaskTextarea" className="add-task-label">
          Enter a new task
        </label>
        <textarea id="TaskTextarea" className="add-task-textarea"></textarea>
        <button onClick={handleAdd} className="add-task-button">
          Add Task
        </button>
      </div>
    </div>

  );
}

export default App;
