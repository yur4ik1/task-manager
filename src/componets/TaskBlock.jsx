import React, { useState } from 'react';

const TaskBlock = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    // Delete the task from mockapi.io
    fetch(`https://63b882346f4d5660c6d855a4.mockapi.io/items/${props.id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the list of tasks in the parent component
        props.onDeleteTask(props.id);
      });
      console.log(props.id)
  };

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>{props.title}</div>
      {isOpen && (
        <div>
          <p>{props.description}</p>
          <button onClick={handleDelete}>Delete Task</button>
        </div>
      )}
    </div>
  );
};

export default TaskBlock;