import React, { useEffect, useState } from 'react';
import { fetchBin, fetchRequests } from '../services/fetchBin';
import BackHomeButton from './BackHomeButton';
import Requests from './Requests';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import Refresh from './Refresh';

const BinPage = ({ binId, handleGoToHome }) => {
  const [requests, setRequests] = useState([]);
  const [creationTime, setCreationTime] = useState("");
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [endPoint, setEndPoint] = useState("");
  useEffect(() => {
    fetchBin(binId).then(bin => {
      const dateConfig = {weekday: "long", year:"numeric", month:"long", day:"numeric", hour: "numeric", minute: "numeric"};
      setCreationTime(new Date(bin.createdAt).toLocaleString("en-US", dateConfig));
      setLastUpdateTime(new Date(bin.updatedAt).toLocaleString("en-US", dateConfig));
      setRequests(bin.requests.reverse());
      setEndPoint(`${window.location.origin}${bin.endPoint}`);
    });
  }, []);

  const handleRefresh = async event => {
    event.preventDefault();
    setRequests((await fetchRequests(binId)).reverse());
  }
  return (
    <main>
      <BackHomeButton handleGoToHome={handleGoToHome} />
      <Refresh handleRefresh={handleRefresh}/>
      <section>
        <p>Your enpoint:</p> 
        <input type="url" name="" id="" readOnly defaultValue={endPoint}/>
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
      {/* <ul>
        {requests.map(request => (<Request key={request._id} request={request} />))}
      </ul> */}
      <Requests requests={requests} />
    </main>
  )
}

export default BinPage;