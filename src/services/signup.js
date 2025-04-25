
export const signupUser = async (formData) => {
  const BACKEND_URL = import.meta.env.BACKEND_URL;
  try {

    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const data = await res.json(); 
      throw new Error(data.message || "Signup failed. Please try again.");
    }

    return res; 
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};
