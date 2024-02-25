
const axios = require('axios');
const { API_KEY } = process.env; // Set your Azure OpenAI API key

const API_URL = '..'; // Adjust the URL as needed

async function getAssistantResponse(conversation) {
  try {
    const response = await axios.post(API_URL, {
      engine: "GoldChatbot",
      messages: conversation,
      temperature: 0.7,
      max_tokens: 800,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: null
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('API Error:', error.message);
    throw new Error('Failed to get response from API');
  }
}

module.exports = { getAssistantResponse };
