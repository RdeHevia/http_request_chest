import React from 'react';

const Request = ({ request }) => {
  const dateConfig = {weekday: "long", year:"numeric", month:"long", day:"numeric", hour: "numeric", minute: "numeric"};
  return (
    <li>
      <section>
        <h1>{request.method} {request.path}</h1>
        <ul>
          <li>{request.protocol.toUpperCase()}</li>
          <li>{request.hostname}</li>
          <li>{new Date(request.createdAt).toLocaleString("en-US", dateConfig)}</li>
          <li>{request.ip}</li>
        </ul>
      </section>
      <section>
        <h2>Headers</h2>
        <ul>
        {Object.keys(request.headers).map(headerName => {
          return <li key={request._id + headerName}><strong>{headerName}:</strong> {request.headers[headerName]}</li>
        })}
        </ul>
      </section>
      <section>
        <h2>Body</h2>
        <textarea name="" id="" cols="100" rows="30" value={JSON.stringify(request.body, null, 3)} readOnly></textarea>
    
      </section>
    </li>
  )
}

export default Request;