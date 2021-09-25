const baseUrl = '/api'

const fetchBin = async (binId) => {
  const response = await fetch(`${baseUrl}/${binId}`);
  return response.json();
}

const fetchRequests = async (binId) => {
  const response = await fetch(`${baseUrl}/${binId}`);
  return (await response.json()).requests;
}

const getIfBinExists = async (binId) => {
  const response = await fetch(`${baseUrl}/${binId}?check_exists=true`);
  return response.json();
}

export {fetchBin, fetchRequests, getIfBinExists}