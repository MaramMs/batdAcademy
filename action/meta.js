"use server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getMeta(language, slug) {
  try {
    const response = await fetch(`${API_KEY}/pages/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language ?? "en",
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching meta:", error);
    return null;
  }
}
