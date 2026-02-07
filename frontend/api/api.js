const url = import.meta.env.API_URL;

export default async function apiFetch(endpoint, method, options) {
  const reqUrl = `${url}/${endpoint}`;
  const request = await fetch(reqUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
    method: method,
  });
  const response = await request.json();
  return response;
}
