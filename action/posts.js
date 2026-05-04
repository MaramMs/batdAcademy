"use server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getPosts(language, queryParams='') {
  console.log(queryParams , 'quer')
  // queryParams already includes the '?' from page.jsx, so we just append it directly
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


