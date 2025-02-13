const CentralOfficeData = async (method = "GET", data = null) => {
  try {
    const requestOptions = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
    };

    let url = "/api/central_office";

    // Handle different HTTP methods
    switch (method.toUpperCase()) {
      case "POST":
      case "PUT":
        requestOptions.body = JSON.stringify(data);
        break;
      case "DELETE":
        // For DELETE, append the ID to the URL
        if (data?.ID) {
          url = `${url}?ID=${data.ID}`;
        }
        break;
    }

    const response = await fetch(url, requestOptions);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Request failed");
    }

    return {
      data: result,
      success: true,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export default CentralOfficeData;
