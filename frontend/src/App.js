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
  // localStorageBinId = window.localStorage.getItem("binId")
  let history = useHistory();
  // console.log(history);
  /*
    - if localStorageBinId
      - setBinId(localStorageBinId)
      - history.push(`/bins/${window.localStorage.getItem("binId")}) 
    - useEffect is triggered if localStorageBinId changes
  */
  useEffect(() => {
    if (binId) {
      history.push(`/bins/${binId}`);
    }
  }, []);

  const handleBinIdChange = event => {
    setBinId(event.target.value);
  }

  /*
    - window.localStorage.setItem("binId",binId);
    - history.push(`/bins/${window.localStorage.getItem("binId")}) NOT NEEDED
  */
  const handleGoToBin = async event => {
    event.preventDefault();
    const binExists = (await getIfBinExists(binId)).exists;

    if (binExists) {
      window.localStorage.setItem("binId",binId);
      history.push(`/bins/${binId}`);
    } else {
      alert(`Bin ${binId} doesn't exists. Please try again or create a new one`);
      setBinId("");
    }
    // check if id exists
    // yes?
      // -add id to localSotorage
      // history.push blabla
  }
  /*
    - setBinId(binId)
    - window.localStorage.setItem("binId",binId);
    - history.push(`/bins/${window.localStorage.getItem("binId")}) NOT NEEDED
  */
  const handleCreateNewBin = async event => {
    let binId = (await createNewBin()).binId;
    setBinId(binId);
    history.push(`/bins/${binId}`);
  }

// handle go back to Home
  // clear localSotorage
  // history.push(/)

  return (
  <>
    <header>Request Bin</header>
      {/* conditional rendering
      Page
        - if binIdSubmitted and valid -> show BinPage
        - if binIdNoSubmitted or not valid -> show Home */}
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
