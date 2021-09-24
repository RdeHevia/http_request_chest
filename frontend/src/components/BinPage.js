import React, { useEffect, useState } from 'react';
import fetchBin from '../services/fetchBin';

const BinPage = ({ binId }) => {
  const [bin, setBin] = useState({});

  useEffect(() => {
    fetchBin(binId).then(bin => {
      setBin(bin)
      console.log(bin);
    });
  }, []);
  return (
    <main>
      <p>{binId}</p>
      <div>{bin.createdAt}</div>
      <ul>
        {(bin.requests || []).map(request => <li>{JSON.stringify(request.method)}</li>)}
      </ul>
    </main>
  )
}

export default BinPage;