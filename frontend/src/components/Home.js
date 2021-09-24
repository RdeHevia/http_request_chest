import React from 'react';
import NewBinButton from './NewBinButton';
import { createNewBin } from '../services/newBin';
const Home = ({ handleGoToBin, binId, handleBinIdChange, handleCreateNewBin }) => {
  
  return (
  <main>
    <div>
      <form onSubmit={handleGoToBin}>
        <label>Enter the Bin Id<input type="text" placeholder="4f6q-u" value={binId} onChange={handleBinIdChange}/></label>
        <button type="submit">Go!</button>testing only: u6anlg
      </form>
    </div>
    <p>or</p>
    <NewBinButton createNewBin={handleCreateNewBin} />
  </main>
  )
}

export default Home;