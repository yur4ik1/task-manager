import React, { useState } from 'react';

function Task({ title, description, onDelete }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  }

  const handleClose = () => {
    setShowPopup(false);
  }

  return (
    <div>
      <div onClick={handleClick}>{title}</div>
      {showPopup && (
        <div>
          <p>{description}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}


export default Task;