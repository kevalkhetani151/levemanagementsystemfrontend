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

export default async function CountLeaves() {
  
  const cookieStore = cookies();
  //@ts-ignore
  const sessionToken = cookieStore.get('sessionToken');

  try {
    // Make the API call
    const response = await fetch("http://localhost:3000/countleaves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${sessionToken}`,
        },
      });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status} - ${response.statusText}`);
    }

    // Parse the successful response
    const responseData: ApiResponse = await response.json();
    console.log("API Response:", responseData);

   

    return responseData; 
  } catch (error: any) {
    console.error("Error during API request:", error.message);
    
    return { error: error.message };
  }
}
