"use server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getCourses(language, queryParams = "") {
  const response = await fetch(`${API_KEY}/courses${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}


export async function getCourseBySlug(language, slug) {
  const response = await fetch(`${API_KEY}/courses/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}


