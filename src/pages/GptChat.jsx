import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import HomePage from '../layouts/HomePage';

const API_KEY = "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";
const userCountry = "Kenya";
const systemMessage = {
  role: "system",
  content: `
    Welcome to the Financial Advisor Chatbot!
    
    Your mission is to provide expert financial advice and educate users on various financial topics. You should explain complex financial concepts in a simple and understandable way, just like you're talking to someone new to finance.

    You can assist with:
    - Budgeting and financial planning
    - Investment strategies
    - Debt management
    - Fraud prevention and financial security
    
    If a question falls outside the financial domain, kindly guide the user to ask relevant financial questions.

    Please provide detailed explanations and recommendations of financial institutions in ${userCountry}. Compare the different institutions and their services, and recommend the best one for the user's needs. tailoer the response to the user's country which is ${userCountry}.
  `,
};

function GptChat() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Here to help Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div className="gpt h-full">
      <div className='h-full w-full bg-slate-200'>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default HomePage(GptChat)