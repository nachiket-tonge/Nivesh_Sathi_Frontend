import { API } from "./config";

export async function signup(data) {
  const res = await fetch(API.AUTH.SIGNUP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Signup failed");
  }

  return true;
}

export async function login(data) {
  const res = await fetch(API.AUTH.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function googleLogin(data) {
  const res = await fetch(API.AUTH.GOOGLE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Google login failed");
  }

  return res.json();
}