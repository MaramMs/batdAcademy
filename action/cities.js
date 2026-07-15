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

// The API has no "get city by id" endpoint — /cities/{value} only resolves by exact
// slug (see getCoursesByCity above). This is the fallback used when a slug lookup
// fails: it pages through the cursor-paginated /cities listing looking for a city
// whose id matches, so a valid id with a stale/wrong slug can still be told apart
// from an id that truly doesn't exist. maxPages=8 (~24 cities/page) comfortably
// covers the current catalog (~55 cities) while keeping this bounded.
export async function findCityById(language, id, { maxPages = 8 } = {}) {
  let cursor;
  for (let page = 0; page < maxPages; page++) {
    const queryParams = cursor ? `?cursor=${cursor}` : "";
    const response = await getCities(language, queryParams);
    const cities = response?.data?.cities || [];
    const match = cities.find((c) => String(c.id) === String(id));
    if (match) return match;
    if (!response?.data?.has_more || !response?.data?.next_cursor) return null;
    cursor = response.data.next_cursor;
  }
  return null;
}


