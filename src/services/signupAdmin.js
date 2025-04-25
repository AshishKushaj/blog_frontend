const BACKEND_URL = import.meta.env.BACKEND_URL;


export const signupAdmin = async (formData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/admin/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Admin signup failed with status: ${response.status}`
      );
    }

    if (data.token) {
      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error("Error during admin signup:", error);
    throw new Error(
      error.message || "An unexpected error occurred during admin signup."
    );
  }
};
