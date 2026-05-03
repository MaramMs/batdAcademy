"use server";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getClients(language) {
  const response = await fetch(`${API_KEY}/clients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}


