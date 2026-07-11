"use server";

const SITEMAP_API_BASE = (process.env.NEXT_PUBLIC_API_KEY || "").replace(/\/api\/v\d+\/?$/, "");
const SITEMAP_REVALIDATE_SECONDS = 21600; // 6 hours

async function fetchSitemapResource(resource, lang) {
  try {
    const response = await fetch(
      `${SITEMAP_API_BASE}/api/sitemap/${resource}?lang=${lang}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: SITEMAP_REVALIDATE_SECONDS },
      }
    );

    if (!response.ok) {
      throw new Error(`Sitemap API "${resource}" (${lang}) returned ${response.status}`);
    }

    const json = await response.json();
    return Array.isArray(json?.data) ? json.data : [];
  } catch (error) {
    console.error(`[sitemap] Failed to load "${resource}" (${lang}):`, error);
    return [];
  }
}

export async function getSitemapCourses(lang) {
  return fetchSitemapResource("courses", lang);
}

export async function getSitemapCategories(lang) {
  return fetchSitemapResource("categories", lang);
}

export async function getSitemapSpecializations(lang) {
  return fetchSitemapResource("specializations", lang);
}

export async function getSitemapBlogs(lang) {
  return fetchSitemapResource("blogs", lang);
}
