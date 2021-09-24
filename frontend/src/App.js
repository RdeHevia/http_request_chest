import React, { useState } from 'react';
import NewBinButton from "./components/NewBinButton";
import Home from './components/Home'
import { createNewBin } from './services/newBin';
import {
  BrowserRouter as Router,
  Switch, Route, useHistory
} from "react-router-dom"
import BinPage from './components/BinPage';
const App = () => {
  const [binId, setBinId] = useState("");
  let history = useHistory();

  const handleBinIdChange = event => {
    setBinId(event.target.value);
  }

  const handleGoToBin = event => {
    history.push(`/bins/${binId}`);
  }

  const handleCreateNewBin = async event => {
    let binId = (await createNewBin()).binId;
    setBinId(binId);
    history.push(`/${binId}`);
  }
  return (
  <>
    <header>Request Bin</header>
      <Switch>
        <Route path={`/bins/${binId}`}>
          <BinPage binId={binId} />
        </Route>
        <Route path="/">
          <Home binId={binId} handleBinIdChange={handleBinIdChange} handleGoToBin={handleGoToBin} handleCreateNewBin={handleCreateNewBin} />
        </Route>
      </Switch>
  </>
  )
}

export default App;
