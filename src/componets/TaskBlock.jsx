import React, { useState } from 'react';
import Modal from 'react-modal';

const TaskBlock = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

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
    <div className="task-block">
      <div className="task-block__title" onClick={handleOpenModal}>{props.title}</div>
      <button className="task-block__delete-button" onClick={handleDelete}>
        ×
      </button>
      <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
        <h2 className="task-block__title">{props.title}</h2>
        <div className="task-block__description">{props.description}</div>
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
};

export default TaskBlock;