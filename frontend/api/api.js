const url = import.meta.env.VITE_API_URL;

export default async function apiFetch(endpoint, method, body) {
  const reqUrl = `${url}/${endpoint}`;
  const request = await fetch(reqUrl, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: method,
  });
  const response = await request.json();
  return response;
}
