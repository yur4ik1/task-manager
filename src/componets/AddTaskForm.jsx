import React, { useState } from 'react';


const AddTaskForm = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Title:', title);  // Print the value of the title state variable

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
  };

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;