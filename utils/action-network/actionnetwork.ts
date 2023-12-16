interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string | FormData;
  // Add any other options you might need
  endpoint: string;
}

export async function makeRequest<T>(endpoint: any, options: RequestOptions = {endpoint}): Promise<T> {
  const url = `https://api.actionnetwork.org/api/v2/events/` + endpoint;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export default makeRequest;