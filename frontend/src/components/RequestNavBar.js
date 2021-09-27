import React from 'react-dom';

const RequestNavBar = ( { requests }) => {
  const dateConfig = {year:"numeric", month:"numeric", day:"numeric", hour: "numeric", minute: "numeric"};
  return (
  <ul>
      {requests.map(request => {
        return (
          <li className="border-b-2 border-r-2 border-l-2 border-gray-900 bg-gray-700 p-4 flex justify-between">
            <p className="font-bold">{request.method}</p>
            <p>{new Date(request.createdAt).toLocaleString("en-US", dateConfig)}</p></li>
        )
      })}
  </ul>
  )
}

export default RequestNavBar;