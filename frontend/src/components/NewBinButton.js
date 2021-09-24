import React from 'react';

const NewBinButton = ({ createNewBin }) => {
  return (
    <div>
      <button type="submit" onClick={createNewBin}>Create new Bin</button>
    </div>
  )
}

export default NewBinButton;