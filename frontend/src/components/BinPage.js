import React, { useEffect, useState } from 'react';
import { fetchBin, fetchRequests } from '../services/fetchBin';
import BackHomeButton from './BackHomeButton';
import Request from './Requests';
import Requests from './Requests';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import Refresh from './Refresh';
import RequestNavBar from './RequestNavBar';

const BinPage = ({ binId, handleGoToHome }) => {
  const [requests, setRequests] = useState([]);
  const [currentRequestId, setCurrentRequestId] = useState("");
  const [creationTime, setCreationTime] = useState("");
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [endPoint, setEndPoint] = useState("");
  useEffect(() => {
    fetchBin(binId).then(bin => {
      const dateConfig = {weekday: "long", year:"numeric", month:"long", day:"numeric", hour: "numeric", minute: "numeric"};
      setCreationTime(new Date(bin.createdAt).toLocaleString("en-US", dateConfig));
      setLastUpdateTime(new Date(bin.updatedAt).toLocaleString("en-US", dateConfig));
      setEndPoint(`${window.location.origin}${bin.endPoint}`);
      if (bin.requests.length > 0) {
        const sortedRequests = bin.requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setRequests(sortedRequests);
        setCurrentRequestId(sortedRequests[0]._id);
      }
    }).then(bin => {
    }).catch(err => console.log(err));
  }, []);

  const handleRefresh = async event => {
    event.preventDefault();
    const sortedRequests = (await fetchRequests(binId)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setRequests(sortedRequests);
  }

  return (
    <div className="text-xl m-5">
      <section className="text-4xl flex flex-col items-center">
        <p className="mb-5">Your endpoint:</p> 
        <input type="url" name="" id="" readOnly defaultValue={endPoint} className=" w-full mb-5 p-5 flex rounded-md bg-gray-800 border-2 border-gray-900 text-yellow-600 placeholder-yellow-600 placeholder-opacity-40 text-center"/>
      </section>
      <div  className="flex bg-gray-800">
        <nav className="flex-none w-96 border-2 p-5 border-gray-900 rounded-tl-md rounded-bl-md">
          <BackHomeButton handleGoToHome={handleGoToHome} />
          <Refresh handleRefresh={handleRefresh}/>
          <section>
            <h2 className="text-3xl font-bold mb-5 mt-5 pb-2 border-b-2 border-gray-900">Bin {binId}</h2>
            <dl className="mb-5">
              <dt className="text-white font-bold">Created on:</dt>
              <dd className="italic text-lg mb-5">{creationTime}</dd>
              <dt className="text-white font-bold">Last request received on:</dt>
              <dd className="italic text-lg">{lastUpdateTime}</dd>
            </dl>
          </section>
          <RequestNavBar requests={requests} setCurrentRequestId={setCurrentRequestId} />
        </nav>
        <main className="flex-auto border-t-2 border-b-2 border-r-2 p-5 border-gray-900 rounded-tr-md rounded-br-md">
            {/* <Requests requests={requests} /> */}
            <Request request={requests.find(request => request._id === currentRequestId)} />
        </main>
      </div>
    </div>
  )
}

export default BinPage;