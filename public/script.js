// public/script.js
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `<strong>${role}:</strong> ${content}`;
    chatMessages.appendChild(messageDiv);
}

async function sendMessage() {
    const userMessage = userInput.value;
    addMessage('user', userMessage);

    try {
        // Send the user message to the server and get the assistant's response
        const response = await fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        const assistantResponse = data.assistantResponse;

        // Display the assistant's response
        addMessage('assistant', assistantResponse);
    } catch (error) {
        console.error('Error sending/receiving messages:', error.message);
    }

    userInput.value = '';
}
