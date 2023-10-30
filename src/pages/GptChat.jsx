import { useState, useRef, useEffect, useMemo } from 'react';
import HomePage from '../layouts/HomePage';
import { useChat } from '../context/chatContext';
import { IoSend } from 'react-icons/io5';
import { profile } from '../assets/images';
import { bot } from '../assets/images';

import HistoryItem from '../components/HistoryItem';
import MobileHistory from '../components/MobileHistory';
import { axiosPrivate } from '../lib/axios/axios';
import useAuth from '../hooks/useAuth';

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
  const { messages, addMessage, clearMessages } = useChat();
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const messageEndRef = useRef(null);

  const { auth } = useAuth()

  /* History management */
  // const [historySession, setHistorySession] = useState('')
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [sessions, setSessions] = useState([])
  const [currentSession, setCurrentSession] = useState('')

  

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
      // const chatGptResponse = await processMessageToChatGPT(message);

      const req = {user_message: message, model_response:"", role: "user", session: sessions?.results?.filter(session => session.user === auth.user_id)[-1]}
      const res = await axiosPrivate.post('api/chat-messages/', req, { headers: {Authorization: `Bearer ${auth.accessToken}`}})

      const chatGptResponse = res.data.model_response
      console.log('gpt res', { chatGptResponse })


      // // Display ChatGPT's response
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

  /* creating a session & handling history
    REM: a session should only be created if there are no sessions for  user or if they want to start a new topic
  */
  useEffect(() => async() => {

    const res = await axiosPrivate.get('api/chat-sessions/', { headers: { Authorization: `Bearer ${auth.accessToken}`}})
    if (res.status === 200) {
      setSessions(res.data?.results?.filter(session => session.user === auth.user_id))
    }

    if (sessions.length === 0) {
      console.log('creating a session!')
      // create a session & save to session (conversation) - just make the whole conversation an object
      const payload = {conversation_history: messages, user: auth.user_id}
      const resp = await axiosPrivate.post('api/chat-sessions/', payload, { headers: {Authorization: `Bearer ${auth.accessToken}`}})
      console.log({ resp })
      if (resp.status === 201) {
        setCurrentSession(resp.data.id)
        // console.log('current session: ', resp.data.id, ' and convos: ', resp.data.conversation_history)
      } else {
        console.log('Session creation failed!')
      }
    } else {
      setCurrentSession(sessions.slice(-1)[0]?.id)
      // console.log('current session: ', sessions.slice(-1)[0]?.id)
      // console.log({ currentSession }, 'current session convo: ', res.data.conversation_history)
    }

    // get user's history (essentially sessions with a summary (topical) - how can I get that (summarize the first question of a session)?)
    // if (!historySession) {
    //   const resp = await axiosPrivate.post('api/chat-sessions/', {}, { headers: {Authorization: `Bearer ${auth.accessToken}`}})
    //   if (resp.status === 201) {
    //     setHistorySession(resp.data?.id)
    //     // console.log('history session: ', resp.data)
    //   }
    // }

    // console.log({ history })

  }, [])

  const getTopic = async(session) => {
    // console.log({ session })
    // const req = {user_message: `summarize the following statement into a short sentence: ${session.conversation_history[0]?.content}`, model_response:"", role: "user", session: historySession}
    // const res = await axiosPrivate.post('api/chat-messages/', req, { headers: {Authorization: `Bearer ${auth.accessToken}`}})
    // const res = await processMessageToChatGPT(`I am looking to display topical-like phrases to summarize conversations. In most circumstances, the conversations will be long sentences, mostly questions. Summarize them, if they can be summarized, into a short sentence, Otherwise, return the original statement without adding anything to it. For instance, if the statement is 'Hello', just return 'hello'. Statement: ${session.conversation_history[0]?.content}`)
    const res = await processMessageToChatGPT(`I am looking to display topical-like phrases that are summaries of given statements. In most circumstances, the conversations will be long sentences, mostly questions. Summarize them, if they can be summarized, into a short sentence, Otherwise, return the original statement without adding anything to it. For instance, given Statement: 'Hello' return Topic: 'hello'. Given Statement: What is Kenya's economic situation right now? return Topic: 'Kenya's economic situation'. Statement: ${session.conversation_history[0]?.content}. Topic:`)
    // if (res.status === 201) {
    // const historyItem = {id: session.id, topic: res.data.model_response, questions: session.conversation_history.length / 2}
    
    if (history?.filter(hist => hist.id === session.id)?.length === 0) {
      const historyItem = {id: session.id, topic: res, questions: Math.floor(session.conversation_history.length / 2)}
      setHistory([...history, historyItem])
    }
    // } else {
    //   console.log('getting session summary failed for: ', session.id)
    // }
  }

  useEffect(() => {
    setHistory([])
    sessions?.map(session => getTopic(session))
  }, [sessions.length])

  // console.log({ sessions }, { currentSession })
  // console.log('history session: ', historySession)

  /* set messages to a session's conversation history whenever a history topic is chosen */
  const setCurrentConversation = (sessionId) => {
    //clear current context
    clearMessages()
    //set current session's convo as context
    const conversations = sessions?.filter(session => session.id === sessionId)[0]?.conversation_history
    // console.log({ conversations })
    conversations.map(chat => {
      let message;
      if (chat.role === 'user') {
        message = {
          message: chat.content,
          direction: 'outgoing',
          sender: 'user',
        }
      } else {
        message = {
          message: typeof(chat.content) === 'string' ? chat.content : chat.content[0],
          direction: 'incoming',
          sender: 'ChatGPT',
        }
      }
      addMessage(message)
    })

    // console.log('setting current session: ', { messages })

  }

  // console.log('res 78: ', sessions[0]?.conversation_history[78].content[0])

  const createNewSession = async() => {
    const payload = {user: auth.user_id}
    // const payload = {}
      const resp = await axiosPrivate.post('api/chat-sessions/', payload, { headers: {Authorization: `Bearer ${auth.accessToken}`}})
      // console.log('new session: ', { resp })
      if (resp.status === 201) {
        setCurrentSession(resp.data.id)
        setCurrentConversation(resp.data.id)
        // console.log('current session: ', resp.data.id, ' and convos: ', resp.data.conversation_history)
      } else {
        console.log('Session creation failed!')
      }
  }

  // console.log({ sessions })

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
          <div className="flex p-2 justify-center rounded bg-blue-500 mb-8 transition-colors hover:bg-blue-400 cursor-pointer"
            onClick={() => createNewSession()}
          >
            <span className="text-white">Start New topic</span>
          </div>
          {/* NOTE/REMEMBER: HistoryItem should set the current chat conversation to that particular history's...
            - which's literally just setting messages to the current sessions history */}
          {history?.map(item => <HistoryItem key={item.id} item={item} setCurrentConversation={setCurrentConversation} />)}
        </div>
      </div>
      {showHistory && <MobileHistory setShowHistory={setShowHistory} history={history} setCurrentConversation={setCurrentConversation} />}
    </div>
  );
}

export default HomePage(GptChat);
