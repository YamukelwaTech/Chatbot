import axios from "axios";

export const getAIResponse = async (prompt) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5000/api/chat",
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
    throw error;
  }
};
