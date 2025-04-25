const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const signupUser = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed. Please try again.");
    }

    return data; 
  } catch (error) {
    console.error(error); 
    throw new Error(
      error.message || "An unexpected error occurred during signup."
    ); 
  }
};
