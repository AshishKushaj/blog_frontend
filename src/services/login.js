
async function loginUser(email, password) {
  const BACKEND_URL = import.meta.env.BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Login failed");
    throw error;
  }

  const { user, token } = data;

  if (token) {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    );

    return user;
  } else {
    throw new Error("Login successful but no token received.");
  }
}

export { loginUser };
