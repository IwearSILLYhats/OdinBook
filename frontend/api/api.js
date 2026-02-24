const url = import.meta.env.VITE_API_URL;

export default async function apiFetch(endpoint, method, body) {
  const reqUrl = `${url}/${endpoint}`;
  const content = {
    headers: {
      "Content-Type": "application/json",
    },
    method: method,
    credentials: "include",
  };
  if (body !== null) {
    content.body = JSON.stringify(body);
  }
  const request = await fetch(reqUrl, content);
  const response = await request.json();
  return response;
}
