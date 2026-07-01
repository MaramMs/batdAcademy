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

// Lightweight action for autocomplete — returns only id/name/slug, deduped by name
export async function getCourseSuggestions(language, query) {
  const response = await fetch(
    `${API_KEY}/courses?search=${encodeURIComponent(query)}&per_page=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language ?? "en",
      },
    }
  );
  const data = await response.json();
  const courses = data?.data?.courses || [];

  const seen = new Set();
  const results = [];
  for (const c of courses) {
    if (seen.has(c.name)) continue;
    seen.add(c.name);
    results.push({ id: c.id, name: c.name, slug: c.slug });
    if (results.length === 8) break;
  }
  return results;
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


