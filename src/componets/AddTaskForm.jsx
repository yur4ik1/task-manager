import React, { useState } from 'react';
import Modal from 'react-modal';

const AddTaskForm = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title) {
      // Save the new task to mockapi.io
      fetch('https://63b882346f4d5660c6d855a4.mockapi.io/items', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ title, description }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the list of tasks in the parent component
          props.onAddTask(data);
        });

      // Clear the form
      setTitle('');
      setDescription('');

      setMessage('Завдання збережене!');
    } else {
      setMessage('Поле з заголовком не заповнено');
    }
  };

  return (

    <div>
      <div className='add__task-wrap'>
        <button className='add__task-btn' onClick={handleOpenModal}>Додати завдання</button>
      </div>

      <Modal className='fade-in' isOpen={isModalOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            height: 'fit-content',
          },
        }}
      >
        <button className="form-block__delete-button" onClick={handleCloseModal}>
          ×
        </button>
        <form className='task-form' onSubmit={handleSubmit}>
          <p>Заголовок</p>
          <input
            placeholder="Заголовок"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <p>Текст завдання</p>
          <textarea
            placeholder="Текст завдання"
            cols="30"
            rows="10"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <div className='task__form-wrap-btn'>
            <button className='task__form-btn' type="submit">Зберегти</button>
            {message && <p className='task-saved fade-in'>{message}</p>}
          </div>

        </form>
      </Modal>
    </div>

  );
};

export default AddTaskForm;