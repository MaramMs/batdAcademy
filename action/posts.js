"use server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getPosts(language, queryParams='') {
  const response = await fetch(`${API_KEY}/posts${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language ?? "en",
    },
  });

  let data = await response.json();
  return data;
}


export async function getPostBySlug(language, slug) {
    const response = await fetch(`${API_KEY}/posts/${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept-Language": language ?? "en",
        },
    });

    let data = await response.json();
    return data;
}



