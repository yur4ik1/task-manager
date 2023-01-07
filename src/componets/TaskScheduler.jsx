import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskBlock from './TaskBlock';
import Skeleton from 'react-loading-skeleton';

const TaskScheduler = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the list of tasks from mockapi.io
    fetch('https://63b882346f4d5660c6d855a4.mockapi.io/items')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });
    setIsLoading(false);
  }, []);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="task-scheduler">
      <h1>Cписок завданнь 📑</h1>
      <AddTaskForm onAddTask={handleAddTask} />
      {isLoading ? (
        <div className="task-blocks">
          <div className="task-block">
            <Skeleton height={50} width={300} />
            <Skeleton height={20} width={200} />
          </div>
          <div className="task-block">
            <Skeleton height={50} width={300} />
            <Skeleton height={20} width={200} />
          </div>
          <div className="task-block">
            <Skeleton height={50} width={300} />
            <Skeleton height={20} width={200} />
          </div>
        </div>
      ) : tasks.length > 0 ? (
        <div className="task-blocks">
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
      ) : (
        <div className='task-scheduler-none'>
          <p>Завданнь немає</p>
        </div>
      )}
    </div>
  );
};

export default TaskScheduler;