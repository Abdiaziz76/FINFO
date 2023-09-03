import { useState } from 'react'
// import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import HomePage from '../layouts/HomePage';

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
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

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
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
      console.log(data);
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
                console.log(message)
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