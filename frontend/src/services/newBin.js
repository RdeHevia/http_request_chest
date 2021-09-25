const baseUrl = '/api'

const createNewBin = async () => {
  const config = {
    method: 'POST'
  }

  const response = await fetch(baseUrl, config);
  // console.log(await response.json());
  return response.json();
}

export { createNewBin }