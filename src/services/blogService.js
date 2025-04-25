const BACKEND_URL = import.meta.env.BACKEND_URL;

async function getBlogs() {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      const error = new Error("Authentication token not found. Please log in.");
      throw error;
    }

    const response = await fetch(`${BACKEND_URL}/api/getBlogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          `Failed to fetch blogs with status: ${response.status}`
      );
      throw error;
    }

    return responseData;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

async function getBlogById(blogId) {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      const error = new Error("Authentication token not found. Please log in.");
      throw error;
    }

    const response = await fetch(`${BACKEND_URL}/api/blogs/${blogId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message ||
          `Failed to fetch blog with status: ${response.status}`
      );
    }

    return responseData;
  } catch (error) {
    console.error(`Error fetching blog ${blogId}:`, error);
    throw error;
  }
}

async function getAdminBlogs() {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      const error = new Error("Authentication token not found. Please log in.");
      throw error;
    }

    const response = await fetch(`${BACKEND_URL}/api/admin/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message ||
          `Failed to fetch admin blogs with status: ${response.status}`
      );
    }

    return responseData;
  } catch (error) {
    console.error("Error fetching admin blogs:", error);
    throw error;
  }
}

async function createBlog(blogData) {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      const error = new Error("Authentication token not found. Please log in.");
      throw error;
    }

    const response = await fetch(`${BACKEND_URL}/api/addBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message ||
          `Failed to create blog with status: ${response.status}`
      );
    }

    return responseData;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
}

async function updateBlog(blogId, updatedData) {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      const error = new Error("Authentication token not found. Please log in.");
      throw error;
    }

    const response = await fetch(`${BACKEND_URL}/api/blogs/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message ||
          `Failed to update blog with status: ${response.status}`
      );
    }

    return responseData;
  } catch (error) {
    console.error(`Error updating blog ${blogId}:`, error);
    throw error;
  }
}

async function deleteBlog(blogId) {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      const error = new Error("Authentication token not found. Please log in.");
      throw error;
    }

    const response = await fetch(`${BACKEND_URL}/api/blogs/${blogId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message ||
          `Failed to delete blog with status: ${response.status}`
      );
    }

    return responseData;
  } catch (error) {
    console.error(`Error deleting blog ${blogId}:`, error);
    throw error;
  }
}

export {
  getBlogs,
  getBlogById,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
