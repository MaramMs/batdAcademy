"use server";

import { cookies } from "next/headers";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

/**
 * Senior Auth Action: Handles User Registration
 * @param {Object} formData - Data from the signup form
 */
// export async function signUpAction(formData, language = "en") {
//   try {
//     const response = await fetch(`${API_KEY}/sign-up`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept-Language": language,
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return { success: false, error: data.message || "Failed to sign up" };
//     }

//     // Set HTTP-only cookie
//     const cookieStore = await cookies();
//     cookieStore.set("auth_token", data.token || data.data?.token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 60 * 60 * 24 * 7,
//       path: "/",
//     });

//     return { success: true, data: data.data || data };
//   } catch (error) {
//     return { success: false, error: "An unexpected error occurred" };
//   }
// }



export async function signUpAction(formData, language = "en") {
  try {
    // 1. Ensure we only send what the API needs
    // We remove 'terms' and 'jobTitle' if the API doesn't want them
    const payload = {
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      country_id: formData.country_id,
      password: formData.password,
      password_confirmation: formData.password, // API usually requires this
    };

    const response = await fetch(`${API_KEY}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
      },
      body: JSON.stringify(payload), // Send the cleaned payload
    });
console.log(response , 'response')
    const data = await response.json();
    // console.log(data , 'data')

    if (!response.ok) {
      // Log the actual API error to your terminal to see why it failed
      console.error("API Error Response:", data);
      return { success: false, error: data.message || "Failed to sign up" };
    }

    const cookieStore = await cookies();
    const token = data.token || data.data?.token;
    
    if (token) {
        cookieStore.set("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

/**
 * Senior Auth Action: Handles User Login
 * @param {Object} credentials - email and password
 */
export async function signInAction(language, credentials) {
  try {
    const response = await fetch(`${API_KEY}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language ?? "en",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "Invalid credentials" };
    }

    const token = data.token || data.data?.token;

    // Set HTTP-only cookie for security
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true, data: data.data || data };
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" };
  }
}

/**
 * Senior Auth Action: Handles Sign Out
 */
export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  return { success: true };
}

/**
 * Retrieves the current user session (Server-side)
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  
  if (!token) return null;

  try {
    const response = await fetch(`${API_KEY}/profile`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return null;
    
    const data = await response.json();
    return data.data || data;
  } catch {
    return null;
  }
}
