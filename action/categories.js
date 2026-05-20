"use server";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getCategories(language) {
  const response = await fetch(`${API_KEY}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}

export async function getCategoryBySlug(language, slug) {
  const response = await fetch(`${API_KEY}/categories/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}

export async function getSpecializationBySlug(language, slug) {
  const response = await fetch(`${API_KEY}/specializations/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });


  let data = await response.json();
  return data;
}