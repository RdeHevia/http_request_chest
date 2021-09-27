import React from 'react-dom';
const Request = ({ request }) => {
  const dateConfig = {weekday: "long", year:"numeric", month:"long", day:"numeric", hour: "numeric", minute: "numeric"};
  return (
    <li>
      <section className="m-5">
        <h1 className="text-5xl font-bold mb-5">{request.method} {request.path}</h1>
        <dl>
          <dt className="text-white font-bold">Received on:</dt>
          <dd className="italic text-lg mb-2">{new Date(request.createdAt).toLocaleString("en-US", dateConfig)}</dd>
          <dt className="text-white font-bold">Protocol:</dt>
          <dd className="italic text-lg mb-2">{request.protocol.toUpperCase()}</dd>
          <dt className="text-white font-bold">From:</dt>
          <dd className="italic text-lg mb-2">{request.hostname}</dd>
          <dt className="text-white font-bold">IP address:</dt>
          <dd className="italic text-lg">{request.ip || "N/A"}</dd>
        </dl>
      </section>
      <section className="m-5">
        <h2 className="text-3xl font-bold mb-5">HEADERS</h2>
        <ul>
        {Object.keys(request.headers).map(headerName => {
          return <li key={request._id + headerName} className="mb-2"><strong>{headerName}:</strong> <i>{request.headers[headerName]}</i></li>
        })}
        </ul>
      </section>
      <section className="m-5">
        <h2>Body</h2>
        <textarea cols="100" value={JSON.stringify(request.body, null, 3) || "{\n\n}"} readOnly className="p-5 w-full h-screen rounded-md bg-gray-800 border-2 border-gray-900 text-yellow-600"></textarea>
      </section>
    </li>
  )
}

const Requests = ( { requests }) => {
  return (
    <ul>
      {requests.map(request => (<Request key={request._id} request={request} />))}
    </ul>
  )
}

export default Requests;