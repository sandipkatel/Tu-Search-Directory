export async function navigateTo(path) {
  try {
    const response = await fetch("http://localhost:5000/navigate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    });

    const data = await response.json();

    if (data.success) {
      // If successful, redirect to the path
      window.location.href = data.redirect;
    } else {
      console.error("Navigation failed:", data.message);
    }
  } catch (error) {
    console.error("Error navigating:", error);
  }
}
