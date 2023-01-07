import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskBlock from './TaskBlock';
import Skeleton from 'react-loading-skeleton';

const TaskScheduler = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://63b882346f4d5660c6d855a4.mockapi.io/items')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
      });
  }, []);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="task-scheduler">
      <h1>Cписок завдань 📑</h1>
      <AddTaskForm onAddTask={handleAddTask} />
      {isLoading ? (
        <div className='task-scheduler-none fade-in'>
          <p>Завантаження...</p>
        </div>
      ) : tasks.length > 0 ? (
        <div className="task-blocks">
          {tasks.map((task) => (
            <TaskBlock className='fade-in'
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      ) : (
        <div className='task-scheduler-none fade-in'>
          <p>Завданнь немає</p>
        </div>
      )}
    </div>
  );
};

export default TaskScheduler;
