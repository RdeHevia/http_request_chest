import React from 'react';

const BackHomeButton = ({ handleGoToHome }) => {
  return (
    <div>
      <button onClick={handleGoToHome} className="border-2 border-gray-900 hover:border-yellow-500 w-full p-5 bg-yellow-500 bg-opacity-80 rounded-md">Back to Home</button>
    </div>
  )
}

export default BackHomeButton;