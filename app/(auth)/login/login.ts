"use server";
import { cookies } from "next/headers";

interface LoginData {
  username: string;
  password: string;
}

interface ApiResponse {
  data: {
    token: string;
  };
  message: string;
}

export default async function LoginUser(data: LoginData) {
  console.log("Data sent to API:", data);

  try {
    // Make the API call
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(data), 
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status} - ${response.statusText}`);
    }

    // Parse the successful response
    const responseData: ApiResponse = await response.json();
    console.log("API Response:", responseData);

    // Set the session token in cookies
    //@ts-ignore
    cookies().set('sessionToken', responseData.data.token, {
      httpOnly: true, // Secure the cookie
      path: '/', // Ensure the cookie is available site-wide
    });

    return responseData; 
  } catch (error: any) {
    console.error("Error during API request:", error.message);
    
    return { error: error.message };
  }
}
