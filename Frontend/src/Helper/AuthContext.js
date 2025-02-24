export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return null;
    }

    const response = await fetch("http://localhost:5000/api/admin/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get user profile");
    }

    return data.admin;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};
