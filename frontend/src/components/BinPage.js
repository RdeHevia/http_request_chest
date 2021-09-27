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
    <div className="text-xl m-5">
      <section className="border-2 text-3xl">
        <p>Your endpoint:</p> 
        <input type="url" name="" id="" readOnly defaultValue={endPoint} className=" w-full mb-5 p-5 flex rounded-md bg-gray-800 border-2 border-gray-900 text-yellow-600 placeholder-yellow-600 placeholder-opacity-40 text-center"/>
      </section>
      <div  className="flex">
        <nav className="border-2 flex-none w-96">
          <BackHomeButton handleGoToHome={handleGoToHome} />
          <Refresh handleRefresh={handleRefresh}/>
          <section className="border-2">
            <h2 className="text-3xl font-bold mb-5">Bin {binId}</h2>
            <dl className="mb-5">
              <dt className="text-white font-bold">Created on:</dt>
              <dd className="italic text-lg mb-5">{creationTime}</dd>
              <dt className="text-white font-bold">Last request received on:</dt>
              <dd className="italic text-lg">{lastUpdateTime}</dd>
            </dl>
          </section>
        </nav>
        <main className="border-2 flex-auto">
            <Requests requests={requests} />
        </main>
      </div>
    </div>
  )
}

export default BinPage;