const baseUrl = '/api'

const fetchBin = async (binId) => {
  const response = await fetch(`${baseUrl}/${binId}`);
  return response.json();
}

const fetchRequests = async (binId) => {
  console.log(binId);
  const response = await fetch(`${baseUrl}/${binId}/requests`);
  return response.json();
}

const getIfBinExists = async (binId) => {
  const response = await fetch(`${baseUrl}/${binId}?check_exists=true`);
  return response.json();
}

export {fetchBin, fetchRequests, getIfBinExists}