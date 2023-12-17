interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string | FormData;
  // Add any other options you might need
  endpoint: string;
}

export async function makeRequest(endpoint: string) {
  const url = `https://actionnetwork.org/api/v2/events?action_network:` + endpoint;
  const response = await fetch(url, {
    method: 'GET',
    headers: { contentType: 'application/json', 'OSDI-API-Token': process.env.ACTION_NETWORK_KEY||'' },
  });
  console.log(url);
  const responseJson = await response.json();

  if (!response.ok) {
    console.log(responseJson);
    throw new Error(`Request failed with status ${response.status}`);
  }

  return responseJson['_embedded']['osdi:events'][0];
}

export default makeRequest;