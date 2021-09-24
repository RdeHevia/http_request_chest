const baseUrl = '/api'

const fetchBin = async (binId) => {
  const response = await fetch(`${baseUrl}/${binId}`);
  return response.json();
}

export default fetchBin;