import React from 'react';

const Refresh = ({ handleRefresh }) => {
  return (
    <>
      <button onClick={handleRefresh} className="border-2 border-gray-900 hover:border-green-300 w-full p-5 bg-green-600 rounded-md">Refresh</button>
    </>
  )
}

export default Refresh;