import axios from "axios";

export const getAIResponse = async (prompt) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found in local storage");
    }

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/chat`,
      { prompt },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    return response.data.response;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
};
