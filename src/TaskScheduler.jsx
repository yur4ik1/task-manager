import React, { useState } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';

function TaskScheduler() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (title, description) => {
    setTasks([...tasks, { title, description }]);
  }

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  }

  return (
    <div>
      <TaskForm onSubmit={handleAddTask} />
      {tasks.map((task, index) => (
        <Task
          key={index}
          title={task.title} description={task.description} onDelete={() => handleDeleteTask(index)} />))}
    </div>
  );
}

export default TaskScheduler;