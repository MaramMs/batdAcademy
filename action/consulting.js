"use server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getConsulting(language, queryParams = "") {
  const response = await fetch(`${API_KEY}/consultation${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}


export async function getConsultantWithService(language, slug, queryParams = '') {
  const response = await fetch(`${API_KEY}/consultation/${slug}${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}

export async function getConsultingDetailsBySlug(language, slug,queryParams = "") {
  const response = await fetch(`${API_KEY}/consultation-service/${slug}${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}


export async function bookingConsultation(language , formData ) {
  const response = await fetch(`${API_KEY}/consultation-request`, {
    method: "POST",
    headers: {
      "Accept-Language": language ?? "en",
    },
    body: formData,
  });

  let data = await response.json();
  return data;
}


