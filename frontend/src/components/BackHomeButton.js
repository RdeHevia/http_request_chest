import React from 'react';

const BackHomeButton = ({ handleGoToHome }) => {
  return (
    <div>
      <button onClick={handleGoToHome}>Back to Home</button>
    </div>
  )
}

export default BackHomeButton;