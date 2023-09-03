import { useState, useEffect } from 'react';
import { BiMicrophone, BiSend, BiMessageRoundedAdd, BiShare, BiSolidDownload, BiLike, BiDislike } from 'react-icons/bi';
import { BsFillChatQuoteFill } from 'react-icons/bs';
import { profile } from '../../assets/images';

const wsBaseUrl = 'ws://127.0.0.1:8001/';

const AiChat = () => {
  const [webSocket, setWebSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Replace 'your-websocket-url' with the actual WebSocket URL of your Django server.
    const ws = new WebSocket(`${wsBaseUrl}ws/chat/finfo/`);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      setWebSocket(ws);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      // Handle incoming messages and update the chatMessages state.
      setChatMessages((prevMessages) => [...prevMessages, messageData]);
    };

    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (webSocket && messageInput.trim() !== '') {
      // Send the message as JSON to the WebSocket server.
      const messageData = {
        message: messageInput,
      };
      webSocket.send(JSON.stringify(messageData));
      setMessageInput('');
    }
  };

  return (
    <div className="flex flex-col p-4 overflow-hidden relative h-full pb-32">
      {/* Your chat UI code here, using chatMessages state to display messages */}
      <div className="flex flex-col gap-2">
        {chatMessages.map((message, index) => (
          <div key={index}>
            {/* Render chat messages using the message object */}
            <div className="text-start">{message.message}</div>
          </div>
        ))}
      </div>
      {/* Input prompt and sending messages */}
      <div className="flex flex-col md:flex-row gap-2 items-center py-2 pr-8 mt-4 fixed bg-white dark:bg-slate-800 bottom-2 md:max-w-[1050px] w-full">
        <div className="flex gap-2 items-center p-2 px-4 w-full md:w-3/4 border dark:border-slate-600 rounded-md">
          <input
            type="text"
            className="w-full px-2 text-slate-600 dark:text-slate-200 bg-transparent focus:outline-none"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <span
            className="text-slate-600 dark:text-slate-200 transition-colors hover:text-blue-700 dark:hover:text-slate-500 text-xl"
            onClick={sendMessage}
          >
            <BiSend />
          </span>
        </div>
        <div className="flex">
          <span className="border dark:border-transparent p-2 rounded-md bg-blue-600 text-white transition-colors hover:bg-blue-900 cursor-pointer flex items-center gap-2">
            <span className="">
              <BiMessageRoundedAdd />
            </span>
            Switch to new topic
          </span>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
