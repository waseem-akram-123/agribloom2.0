"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    chatbase: any;
  }
}

export function ChatWidget() {
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
    <iframe
      src="https://www.chatbase.co/chatbot-iframe/ZmcgdIA6RpyzhDjOF_ahr"
      width="100%"
      style={{ height: "100%", minHeight: "700px", border: "none" }}
      frameBorder="0"
    ></iframe>
  );
}