import React, { useEffect, useState } from 'react';
import NewBinButton from "./components/NewBinButton";
import Home from './components/Home'
import { createNewBin } from './services/newBin';
import { getIfBinExists } from './services/fetchBin';
import {
  BrowserRouter as Router,
  Switch, Route, useHistory
} from "react-router-dom"
import BinPage from './components/BinPage';
const App = () => {
  const [binId, setBinId] = useState(window.localStorage.getItem("binId") || "");
  const [binIdFormInput, setBinIdFormInput] = useState("");

  let history = useHistory();
  
  useEffect(() => {
    if (binId) {
      history.push(`/bins/${binId}`);
    } else {
      history.push(`/`)
    }
  }, [binId, history]);

  const handleBinIdChange = event => {
    setBinIdFormInput(event.target.value);
  }

  const handleGoToBin = async event => {
    event.preventDefault();
    const binExists = (await getIfBinExists(binIdFormInput)).exists;

    if (binExists) {
      setBinId(binIdFormInput);
      window.localStorage.setItem("binId",binIdFormInput);

    } else {
      alert(`Bin ${binIdFormInput} doesn't exists. Please try again or create a new one`);
      setBinIdFormInput("");
    }
  }

  const handleGoToHome = event => {
    event.preventDefault();
    setBinIdFormInput(binId);
    setBinId("");
    window.localStorage.setItem("binId","");
  }

  const handleCreateNewBin = async event => {
    let newBinId = (await createNewBin()).binId;
  
    setBinId(newBinId);
    window.localStorage.setItem("binId",newBinId);
  }

  return (
  <body className="text-white font-sans">
    <header className="flex content-center justify-center p-20"><h1 className="text-9xl">Request Bin</h1></header>
      <Switch>
        <Route path={`/bins/${binId}`}>
          <BinPage binId={binId} handleGoToHome={handleGoToHome}/>
        </Route>
        <Route path="/">
          <Home binId={binIdFormInput} handleBinIdChange={handleBinIdChange} handleGoToBin={handleGoToBin} handleCreateNewBin={handleCreateNewBin} />
        </Route>
      </Switch>
  </body>
  )
}

export default App;
