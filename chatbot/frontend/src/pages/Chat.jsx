import { useRef, useEffect, useState } from "react";

import OpenAI from "openai";
import axios from "axios";
const Chat = () => {
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [webSearch, setWebSearch] = useState(false);
  const [currentModel, setCurrentModel] = useState("gemini");
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const askOpneAi = async () => {
    if (message.trim() === "") {
      alert("Empty message! Please write something.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/api/chat/openai`,
        { message: message, webSearch: webSearch },
        { withCredentials: true }
      );
      console.log("frontend response:", response);
      const aiReply = response.data;
      setChatHistory((prev) => [...prev, ...{ role: "ai", content: aiReply }]);
      setMessage("");
    } catch (error) {
      console.error("while asking openai:", error);
      setMessage("");
    }
  };

  const askGemini = async () => {
    if (message.trim() === "") {
      alert("Empty message! Please write something.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/api/chat/gemini`,
        { message: message, webSearch: webSearch },
        { withCredentials: true }
      );
      console.log("frontend response:", response);
      const aiReply = response.data;
      setChatHistory((prev) => [...prev, { role: "ai", content: aiReply }]);
      setResponse(response.data);
      setMessage("");
    } catch (error) {
      setMessage("");
      console.error("while asking openai:", error);
    }
  };

  const chooseAndAskModel = () => {
    setChatHistory((prev) => [...prev, { role: "user", content: message }]);

    if (currentModel === "gemini") {
      askGemini();
    } else if (currentModel === "openai") {
      askOpneAi();
    }
  };

  return (
    <div className="flex  bg-black flex-col min-h-screen ">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={` px-4 py-2  max-w-[90%] break-words whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-green-800 self-end rounded-t-3xl rounded-bl-3xl"
                : "bg-gray-800 self-start rounded-t-3xl rounded-br-3xl"
            } text-white`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* input bar */}
      <div className="bg-gray-900 sticky bottom-0 border w-full p-4 flex flex-col  items-center gap-2">
        <div className="w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && chooseAndAskModel()}
            placeholder={`Ask ${currentModel} anything...`}
            className="flex-1 w-full text-white border border-green-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className=" px-3 flex w-full justify-between items-center">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
            </svg>
          </button>
          <select
            value={currentModel}
            onChange={(e) => setCurrentModel(e.target.value)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none"
          >
            <option value="openai">OpenAI</option>
            <option value="gemini">Gemini</option>
            <option value="grok">Grok</option>
            <option value="claude">Claude</option>
            <option value="deepseek">Deepseek</option>
          </select>
          <label
            className={`px-3 py-1 rounded-full border cursor-pointer select-none transition-colors 
    ${
      webSearch
        ? "border-blue-500 text-blue-400 bg-blue-950"
        : "border-gray-500 text-gray-300"
    }`}
          >
            <input
              type="checkbox"
              checked={webSearch}
              onChange={(e) => setWebSearch(e.target.checked)}
              className="hidden"
            />
            Search Web
          </label>

          <button
            onClick={chooseAndAskModel}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M417-126v-466L215-390l-89-90 354-354 354 354-89 90-202-202v466H417Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
