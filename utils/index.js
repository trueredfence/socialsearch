export async function fetchSocialDetails(param) {
  const { headers, url } = param;
  //Set the required headers for the API request
  const response = await fetch(url, {
    headers: headers,
  });
  // Parse the response as JSON
  const result = await response.json();
  return result;
}
