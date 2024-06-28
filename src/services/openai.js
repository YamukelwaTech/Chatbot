import axios from "axios";

const API_KEY = "your-openai-api-key";

export const getAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt,
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
};
