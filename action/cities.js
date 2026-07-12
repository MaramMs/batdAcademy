"use server";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getCities(language, queryParams = '') {
  const response = await fetch(`${API_KEY}/cities${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}

export async function getCountries(language) {
  const response = await fetch(`${API_KEY}/countries`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}
export async function getCoursesByCity(language, slug) {
  const response = await fetch(`${API_KEY}/cities/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}


