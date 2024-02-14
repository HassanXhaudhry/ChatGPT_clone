import React, { useState } from 'react';

const ChatComponent = () => {
  const [promptText, setPromptText] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const sendPrompt = async () => {
    try {
      const response = await fetch('https://zainchaudhary.pythonanywhere.com/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'prompt=' + encodeURIComponent(promptText),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }

      const data = await response.json();
      
      setResponse('Response: ' + data.reply);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('Error: ' + error.message);
      setResponse('');
    }
  };

  return (
    <div>
      <input
        type="text"
        id="promptInput"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
      />
      <button onClick={sendPrompt}>Send Prompt</button>
      <div id="responseDisplay">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {response && <p>{response}</p>}
      </div>
    </div>
  );
};

export default ChatComponent;
