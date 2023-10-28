import React, { useState, useRef, useEffect } from 'react';
import HomePage from '../layouts/HomePage';
import { useChat } from '../context/chatContext';
import { IoSend } from 'react-icons/io5';
import { profile } from '../assets/images';
import { bot } from '../assets/images';

import HistoryItem from '../components/HistoryItem';
import MobileHistory from '../components/MobileHistory';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

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

  Please provide detailed explanations and recommendations of financial institutions in ${userCountry}. Compare the different institutions and their services, and recommend the best one for the user's needs. tailor the response to the user's country, which is ${userCountry}.

  Provide clear HTML tagged headings, use paragraphs, lists, spacing, new lines where necessary i.e in lists, and formatting for better readability. Return rich text with HTML tags so that it is displayed properly to the user. Strictly return HTML5 formatted text which contains only the body tag. You can add Tailwind styles to the HTML tags to make the content more readable.
`,
};

function GptChat() {
  const { messages, addMessage } = useChat();
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const messageEndRef = useRef(null);

  // temporary - I should use messages here
  const history = ['temp']
  const [showHistory, setShowHistory] = useState(false)

  

  useEffect(() => {
    // Scroll to the latest message when new messages arrive
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = inputMessage.trim();
    if (message === "") return;

    setInputMessage(""); // Clear the input field

    const userMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    // Display the user's message immediately
    addMessage(userMessage);

    setIsTyping(true);

    try {
      const chatGptResponse = await processMessageToChatGPT(message);

      // Display ChatGPT's response
      addMessage({
        message: chatGptResponse,
        direction: 'incoming',
        sender: 'ChatGPT',
      });
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(userMessage) {
    const apiMessages = [
      systemMessage,
      ...messages.map((messageObject) => {
        const role = messageObject.sender === 'ChatGPT' ? 'assistant' : 'user';
        return { role, content: messageObject.message };
      }),
      { role: 'user', content: userMessage },
    ];

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: apiMessages,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from OpenAI.');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  return (
    <div className="gpt h-full relative">
      <div className="h-full w-full bg-slate-100 dark:bg-slate-800 flex">
        <div className="chat-container flex flex-col justify-between h-full py-2 flex-1">
          <div className="message-list flex flex-col" >
            <div className="flex md:hidden dark:text-blue-400 items-center justify-end py-2 mb-4">
              <span className="hover:underline cursor-pointer" onClick={() => setShowHistory(true)}>See history</span>
            </div>
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${message.direction === 'incoming' ? 'self-start rounded-r-md text-start' : 'flex-row-reverse self-end rounded-l-md'
                }`}
              >
                <span className="">
                  <img src={message.direction === 'incoming' ? bot : profile} alt="" className="object-cover h-8 w-8 rounded-full overflow-hidden border" />
                </span>
                <div
                  className={`message m-1 p-3 flex flex-row gap-1 ${
                    message.direction === 'incoming' ? 'incoming' : 'outgoing'
                  } ${message.direction === 'incoming' ? 'bg-blue-300 self-start w-full sm:w-3/4 rounded-r-2xl rounded-bl-2xl text-start' : 'bg-blue-200 self-end rounded-l-2xl rounded-br-2xl'
                  } `}
                >
                  
                  <div dangerouslySetInnerHTML={{ __html: message.message }} />
                </div>
              </div>
            ))}

            <div ref={messageEndRef} />
          </div>
          <>
            {isTyping ? <p className='text-blue-400 self-start animate-pulse rounded-md text-6xl font-semibold text-center mt-auto'>...</p> : ''}
            <div className="sticky bottom-1 w-full sm:3/4 self-center flex items-center justify-center ">
              <div className="message-input  w-full sm:w-3/4 self-center mt-10  bottom-0 relative ">
                <form onSubmit={handleSend}>
                  <input
                    type="text"
                    disabled={isTyping}
                    placeholder="Type message here"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className='w-full p-4 rounded-md bg-slate-300 placeholder-slate-500 font-semibold'
                  />
                  <button type='submit' className='absolute right-4 top-4  z-10' onClick={handleSend}>
                    <IoSend className='text-blue-400 text-xl ' />
                  </button>
                </form>
              </div>
            </div>
          </>
        </div>
        <div className="hidden md:flex flex-col gap-2 border-l border-slate-600 w-[250px] pl-2 text-start">
          {history?.map(item => <HistoryItem key={item} item={item} />)}
        </div>
      </div>
      {showHistory && <MobileHistory setShowHistory={setShowHistory} history={history} />}
    </div>
  );
}

export default HomePage(GptChat);
