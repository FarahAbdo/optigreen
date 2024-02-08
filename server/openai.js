// // server/openai.js
// const axios = require('axios');

// const OPENAI_API_KEY = 'api_key';
// const OPENAI_API_URL = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';

// async function getAssistantResponse(userMessage) {
//   try {
//     const response = await axios.post(OPENAI_API_URL, {
//       prompt: `You are an AI assistant that helps people find direct information about the price of gold in Germany at January 2024.\n\nUser: ${userMessage}`,
//       max_tokens: 150,
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${OPENAI_API_KEY}`,
//       },
//     });

//     return response.data.choices[0].text.trim();
//   } catch (error) {
//     console.error('OpenAI API Error:', error.message);
//     throw new Error('Failed to get response from OpenAI API');
//   }
// }

// module.exports = { getAssistantResponse };

// server/openai.js
const axios = require('axios');
const { AZURE_OPENAI_API_KEY } = process.env; // Set your Azure OpenAI API key

const AZURE_OPENAI_API_URL = 'https://goldchatbot.openai.azure.com/v1/completions'; // Adjust the URL as needed

async function getAssistantResponse(conversation) {
  try {
    const response = await axios.post(AZURE_OPENAI_API_URL, {
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
        'Authorization': `Bearer ${AZURE_OPENAI_API_KEY}`,
      },
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Azure OpenAI API Error:', error.message);
    throw new Error('Failed to get response from Azure OpenAI API');
  }
}

module.exports = { getAssistantResponse };
