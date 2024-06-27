import axios from "axios";

const API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions";

export const fetchAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        prompt: prompt,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
};
