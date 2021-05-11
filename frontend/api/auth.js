import redaxios from "redaxios";
import setupCsrfToken from "root/api/setupCsrfToken";

export async function getSession() {
  const response = await redaxios.get("/session");

  return response;
}

export async function login(email, password) {
  const response = await redaxios.post("/session", { email, password });

  return response;
}

export async function logout() {
  const response = await redaxios.delete("/session");

  setupCsrfToken(response.data);

  return response;
}
