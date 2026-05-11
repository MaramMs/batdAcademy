"use server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getPlans(language, queryParams = "") {
  const response = await fetch(`${API_KEY}/year-plans${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
    
  });

  let data = await response.json();
  return data;
}


export async function getPlanById(language, id, queryParams = "") {
  const response = await fetch(`${API_KEY}/year-plans/${id}${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}
