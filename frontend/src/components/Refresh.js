import React from 'react';

const Refresh = ({ handleRefresh }) => {
  return (
    <>
      <button onClick={handleRefresh}>Refresh</button>
    </>
  )
}

export default Refresh;