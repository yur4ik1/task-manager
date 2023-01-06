import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskBlock from './TaskBlock';

const TaskScheduler = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load the list of tasks from mockapi.io
    fetch('https://63b882346f4d5660c6d855a4.mockapi.io/items')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>Task Scheduler</h1>
      <AddTaskForm onAddTask={handleAddTask} />
      {tasks.map((task) => (
        <TaskBlock
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          onDeleteTask={handleDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskScheduler;