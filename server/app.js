// // server/app.js
// const express = require('express');
// const openai = require('./openai'); // Assuming you have a module to handle OpenAI interactions

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.static('public'));

// app.use(express.json());

// app.post('/ask', async (req, res) => {
//     try {
//       const userMessage = req.body.message;
  
//       // Add the user message to the conversation
//       conversation.push({ role: 'user', content: userMessage });
  
//       // Call a function to interact with the OpenAI API and get the assistant's response
//       const assistantResponse = await openai.getAssistantResponse(conversation);
  
//       console.log('OpenAI API Response:', assistantResponse); // Add this line for debugging
  
//       // Add the assistant's response to the conversation
//       conversation.push({ role: 'assistant', content: assistantResponse });
  
//       // Send the response back to the client
//       res.json({ assistantResponse });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// server/app.js
const express = require('express');
const openai = require('./openai'); // Assuming you have a module to handle Azure OpenAI interactions

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const conversation = [];

app.post('/ask', async (req, res) => {
  try {
    const userMessage = req.body.message;

    conversation.push({ role: 'user', content: userMessage });

    const assistantResponse = await openai.getAssistantResponse(conversation);

    conversation.push({ role: 'assistant', content: assistantResponse });

    res.json({ assistantResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
