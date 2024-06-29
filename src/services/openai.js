import axios from "axios";

export const getAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/chat",
      { prompt },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      }
    );
    return response.data.response;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
};