import React, { useState, useRef, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { generateMermaidCode } from '../../services/mermaidService';
import {
  ChatBotSection,
  ChatMessages,
  BotMessage,
  UserMessage,
  ChatInputRow,
  ChatInput,
  ChatSendBtn
} from './ChatBot.styled';

const ChatBot = ({ setCode }) => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi there! How can I help you with Mermaid syntax today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false); // <-- loader state
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'user', text: input }]);
      setLoading(true); // <-- show loader
      // Get diagram type and existing code from MainContent DOM
      const diagramTypeElem = document.getElementById('diagramType');
      const codeElem = document.getElementById('code');
      const payload = {
        description: input,
        diagram_type: diagramTypeElem ? diagramTypeElem.value : '',
        existing_code: codeElem ? codeElem.value : ''
      };
      console.log('Payload sent to backend:', payload);
      setInput('');
      try {
        const data = await generateMermaidCode(payload);
        if (setCode && data.mermaid_code) {
          setCode(data.mermaid_code);
        }
        setMessages(msgs => [
          ...msgs,
          { type: 'bot', text: 'Check your generated Mermaid code in the upper textarea.' }
        ]);
        console.log(data);
        console.log(data.mermaid_code);
      } catch (error) {
        setMessages(msgs => [...msgs, { type: 'bot', text: 'Error connecting to backend.' }]);
      } finally {
        setLoading(false); 
      }
    }
  };

  return (
    <ChatBotSection>
      <h3>Need help with syntax?</h3>
      <ChatMessages>
        {messages.map((msg, idx) => (
          msg.type === 'bot'
            ? <BotMessage key={idx}>{msg.text}</BotMessage>
            : <UserMessage key={idx}>{msg.text}</UserMessage>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <BeatLoader color="#58f3ff" size={9} speedMultiplier={2} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </ChatMessages>
      <ChatInputRow>
        <ChatInput
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <ChatSendBtn onClick={handleSend}>&#9658;</ChatSendBtn>
      </ChatInputRow>
    </ChatBotSection>
  );
};

export default ChatBot;
