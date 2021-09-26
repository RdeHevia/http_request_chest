import React from 'react';
import NewBinButton from './NewBinButton';
import { createNewBin } from '../services/newBin';
const Home = ({ handleGoToBin, binId, handleBinIdChange, handleCreateNewBin }) => {
  
  return (
  <main className="flex flex-col items-center text-3xl m-36">
      <form onSubmit={handleGoToBin} className="flex flex-col items-center mb-5 w-1/4">
        <label htmlFor="bin-input" className="mb-5">Enter Bin ID</label>
        <input id="bin-input" type="text" placeholder="u6anlg" value={binId} onChange={handleBinIdChange} className=" w-full mb-5 p-5 flex rounded-md bg-gray-800 border-2 border-gray-900 text-yellow-600 placeholder-yellow-600 placeholder-opacity-40 text-center"/>
        <button type="submit" className="border-2 border-gray-900 hover:border-green-300 w-full p-5 bg-green-600 rounded-md">Go!</button>
      </form>
    <p className="mb-5">or</p>
    <NewBinButton createNewBin={handleCreateNewBin}/>
  </main>
  )
}
// testing only: u6anlg
export default Home;