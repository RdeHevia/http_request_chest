import React from 'react-dom';

const RequestNavBar = ( { requests, setCurrentRequestId }) => {
  const dateConfig = {year:"numeric", month:"numeric", day:"numeric", hour: "numeric", minute: "numeric"};
  return (
  <ul className="border-2 border-gray-900 rounded-md">
      {requests.map(request => {
        return (
          <li key={request._id} onClick={() => setCurrentRequestId(request._id)} className="border-b-2 border-gray-900 hover:text-yellow-500 cursor-pointer bg-gray-700 p-4 flex justify-between">
            <p className="font-bold">{request.method}</p>
            <p>{new Date(request.createdAt).toLocaleString("en-US", dateConfig)}</p></li>
        )
      })}
  </ul>
  )
}

export default RequestNavBar;