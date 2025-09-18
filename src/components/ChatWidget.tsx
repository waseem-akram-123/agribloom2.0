"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    chatbase: any;
  }
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initialize Chatbase
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args: any[]) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };

      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args: any[]) => target(prop, ...args);
        },
      });

      // Load Chatbase script
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "ZmcgdIA6RpyzhDjOF_ahr";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          title="Open AgriChat AI"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg z-10"
            title="Close Chat"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Chat Iframe */}
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/ZmcgdIA6RpyzhDjOF_ahr"
            width="350"
            height="500"
            style={{ border: "none", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
            frameBorder="0"
            title="AgriChat AI"
          ></iframe>
        </div>
      )}
    </div>
  );
}