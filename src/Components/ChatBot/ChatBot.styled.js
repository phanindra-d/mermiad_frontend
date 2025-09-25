import styled from 'styled-components';

export const ChatBotSection = styled.div`
  background: #f9fbfd;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 1.5rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #e0e7ef;
`;

export const ChatMessages = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 0.7rem;
  font-size: 0.98rem;
  color: #444;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 180px;
  min-height: 180px;
  padding-bottom: 2.5rem;
`;

export const BotMessage = styled.div`
  align-self: flex-start;
  background: #eaf6ff;
  color: #0a8fd6;
  padding: 0.5rem 1rem;
  border-radius: 12px 12px 12px 4px;
  max-width: 80%;
  font-weight: 500;
`;

export const UserMessage = styled.div`
  align-self: flex-end;
  background: #12b3ff;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 12px 12px 4px 12px;
  max-width: 80%;
  font-weight: 500;
`;

export const ChatInputRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #e0e7ef;
  font-size: 1rem;
  outline: none;
`;

export const ChatSendBtn = styled.button`
  background: #12b3ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0 1.2rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0a8fd6;
  }
`;
