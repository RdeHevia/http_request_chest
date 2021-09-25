import React, { useEffect, useState } from 'react';
import { fetchBin } from '../services/fetchBin';
import BackHomeButton from './BackHomeButton';
import Request from './Request';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

const BinPage = ({ binId, handleGoToHome }) => {
  const [requests, setRequests] = useState([]);
  const [creationTime, setCreationTime] = useState("");
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  useEffect(() => {
    fetchBin(binId).then(bin => {
      const dateConfig = {weekday: "long", year:"numeric", month:"long", day:"numeric", hour: "numeric", minute: "numeric"};
      setCreationTime(new Date(bin.createdAt).toLocaleString("en-US", dateConfig));
      setLastUpdateTime(new Date(bin.updatedAt).toLocaleString("en-US", dateConfig));
      setRequests(bin.requests);
      console.log(requests);
    });
  }, []);
  return (
    <main>
      <BackHomeButton handleGoToHome={handleGoToHome} />
      <section>
        <p>Your enpoint:</p> 
        <input type="url" name="" id="" readOnly defaultValue={`${window.location.hostname}/${binId}`}/>
      </section>
      <section>
        <ul>
          <li>Bin {binId}</li>
          <li>Bin created on: {creationTime}</li>
          <li>Last request received on: {lastUpdateTime}</li>
        </ul>
      </section>
      <section>

      </section>
      <ul>
        {requests.map(request => (<Request key={request._id} request={request} />))}
      </ul>
    </main>
  )
}

export default BinPage;