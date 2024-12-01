

import React, { useState } from "react";
import Header from "../assets/components/Header";
import "react-toastify/dist/ReactToastify.css";

const ChatBot = () => {
  // Chat prompt data
  const chatData = [
    {
      id: 1,
      message: "Hi,How can I assist you today?",
      options: [
        { id: 1, label: "Billing Information", next_prompt_id: 2 },
        { id: 2, label: "Plan Recommendation", next_prompt_id: 8 },
        { id: 3, label: "Troubleshooting", next_prompt_id: 9 }
      ]
    },
    {
      id: 2,
      message: "What do you need help with regarding billing?",
      options: [
        { id: 4, label: "View my current bill", next_prompt_id: 3 },
        { id: 5, label: "Update my payment method", next_prompt_id: null },
        { id: 6, label: "Understand extra charges", next_prompt_id: null }
      ]
    },
    {
      id: 3,
      message: "Would you like to download a PDF copy of your bill?",
      options: [
        { id: 7, label: "Yes", next_prompt_id: 4 },
        { id: 8, label: "No", next_prompt_id: 6 }
      ]
    },
    {
      id: 4,
      message: "Your bill has been downloaded. Do you need help with anything else?",
      options: [
        { id: 9, label: "View another bill", next_prompt_id: null },
        { id: 10, label: "Exit", next_prompt_id: 5 }
      ]
    },
    {
      id: 5,
      message: "Thank you for using our service!",
      options: []
    },
    {
      id: 6,
      message: "Would you like to review any specific charges on your bill?",
      options: [
        { id: 11, label: "Yes, show details of extra charges", next_prompt_id: null },
        { id: 12, label: "No, I am done", next_prompt_id: 5 }
      ]
    },
    {
      id: 8,
      message: "Plan Recommendation: What type of plan are you looking for?",
      options: [
        { id: 13, label: "Personal Plan", next_prompt_id: null },
        { id: 14, label: "Family Plan", next_prompt_id: null }
      ]
    },
    {
      id: 9,
      message: "Troubleshooting: What issue are you facing?",
      options: [
        { id: 15, label: "Internet not working", next_prompt_id: null },
        { id: 16, label: "Slow speed", next_prompt_id: null }
      ]
    }
  ];

  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  const [isChatboxFullscreen, setIsChatboxFullscreen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentPromptId, setCurrentPromptId] = useState(1);


  const toggleChatbox = () => {
    setIsChatboxVisible((prevState) => !prevState);
  };
  const toggleFullscreen = () => {
    setIsChatboxFullscreen((prevState) => !prevState);
  };
  const closeChatbox = () => {
    setIsChatboxVisible(false);
    setIsChatboxFullscreen(false);
  };

  const handleOptionClick = (option) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { message: option.label, sender: "user" }
    ]);
    if (option.next_prompt_id) {
      const nextPrompt = chatData.find((prompt) => prompt.id === option.next_prompt_id);
      if (nextPrompt) {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { message: nextPrompt.message, sender: "bot" }
        ]);
        setCurrentPromptId(nextPrompt.id);
      }
    } else {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { message: "Thank you for using our service!", sender: "bot" }
      ]);
      setCurrentPromptId(null);
    }
  };

  const currentPrompt = chatData.find((prompt) => prompt.id === currentPromptId);

  return (
    <>
      <Header title={"ChatBot"} />
      <div className="chatbot-container">
        {isChatboxVisible && (
          // <div className={`chatbox ${isChatboxFullscreen ? "fullscreen" : ""}`}>
          <div className="chatbox" >

            <header className="chatbot-header">
              <h3>ChatBot</h3>
              <div className="controls">
                <button onClick={toggleChatbox}>─</button>
                {/* <button onClick={toggleFullscreen}>
                  {isChatboxFullscreen ? "⤡" : "⬍"}
                </button> */}
                <button onClick={closeChatbox}>✕</button>
              </div>
            </header>

            <div className="chat">
              <div className="chat-message bot">Hi, How can i assist you</div>
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`chat-message ${chat.sender === "user" ? "user" : "bot"}`}
                >
                  {chat.message}
                </div>
              ))}
              {currentPrompt && (
                <>

                  {/* <div className="chat-message bot">{currentPrompt.message}</div> */}
                  <div className="options">
                    {currentPrompt.options.map((option) => (
                      <button
                        key={option.id}
                        className="option-button"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <footer>
              <input type="text" placeholder="Type your message..." disabled />
              <button disabled>Send</button>
            </footer>
          </div>
        )}
        <button className="bot-toggle-button" onClick={toggleChatbox}>
          🤖
        </button>
      </div>
    </>
  );
};

export default ChatBot;

