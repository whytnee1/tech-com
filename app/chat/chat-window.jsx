"use client";

import { useState, useRef, useEffect } from "react";
import { FaTerminal, FaPaperPlane, FaRobot, FaUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { db } from "@/config/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from "firebase/firestore";

export default function ChatWindow() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Sync Real-time Database Log Array Streams via Firestore Subscriptions
  useEffect(() => {
    const messagesQuery = query(
      collection(db, "support_chats"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const activeMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(activeMessages);
    });

    return () => unsubscribe();
  }, []);

  // Automatically scroll viewport down to recent message data blocks
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const payload = {
      text: inputValue,
      sender: session?.user?.email || "anonymous_user",
      senderName: session?.user?.name || "Anonymous User",
      senderImage: session?.user?.image || null,
      isSystem: false,
      timestamp: serverTimestamp()
    };

    setInputValue("");

    try {
      // Ingest user message node into cloud collection path
      await addDoc(collection(db, "support_chats"), payload);

      // Automated structural system validation handshake mock response trigger
      setTimeout(async () => {
        await addDoc(collection(db, "support_chats"), {
          text: `Received payload string. Our developer infrastructure is assessing logs for user node: ${payload.senderName}.`,
          sender: "system",
          senderName: "System Core",
          isSystem: true,
          timestamp: serverTimestamp()
        });
      }, 1500);

    } catch (error) {
      console.error("Write execution compilation failure on Firebase nodes:", error);
    }
  };

  // Safe time formatting helper logic block
  const formatTimestamp = (ts) => {
    if (!ts) return "Syncing...";
    const date = ts.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-[75vh]">
      
      {/* Tech Interface Header Banner */}
      <div className="bg-[#4B0082] px-6 py-4 text-white flex items-center justify-between relative shrink-0">
        <div className="absolute top-2 left-4 flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-80"></span>
        </div>

        <div className="flex items-center gap-3 pt-3">
          <div className="p-2 bg-[#4B0082] rounded-md text-white">
            <FaTerminal className="text-lg" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold tracking-tight">LETSCODE_CHAT_HUB</h1>
            <p className="text-xs text-purple-200 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span>
              Status: Live Firebase Sync
            </p>
          </div>
        </div>

        <div className="hidden sm:block text-right font-mono text-xs text-purple-200 pt-3">
          <p>Port: 443 // Cloud Firestore</p>
        </div>
      </div>

      {/* Main Chat Message Node Log Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
        {messages.length === 0 && (
          <div className="text-center py-10 font-mono text-xs text-gray-400">
            [Awaiting system packet initialization...]
          </div>
        )}
        
        {messages.map((msg) => {
          const isSystem = msg.isSystem;
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 max-w-[85%] sm:max-w-[75%] ${
                isSystem ? "mr-auto" : "ml-auto flex-row-reverse"
              }`}
            >
              {/* Profile Avatar Node Icons */}
              <div
                className={`p-2 rounded-full text-xs shrink-0 ${
                  isSystem ? "bg-purple-100 text-[#4B0082]" : "bg-[#4B0082] text-white"
                }`}
              >
                {isSystem ? <FaRobot /> : <FaUser />}
              </div>

              {/* Message Payload Cards */}
              <div>
                <div
                  className={`p-3.5 rounded-lg text-sm leading-relaxed shadow-sm ${
                    isSystem
                      ? "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                      : "bg-[#4B0082] text-white rounded-tr-none"
                  }`}
                >
                  <span className={`block font-mono text-[9px] uppercase font-bold tracking-wider mb-1 ${
                    isSystem ? "text-[#4B0082]" : "text-purple-200"
                  }`}>
                    {msg.senderName}
                  </span>
                  {msg.text}
                </div>
                <span className={`block text-[10px] text-gray-400 mt-1 font-mono ${
                  isSystem ? "text-left" : "text-right"
                }`}>
                  {formatTimestamp(msg.timestamp)}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Persistent Client Input Interface Footer */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-100 bg-white flex items-center gap-3 shrink-0"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Append cloud messaging query payload string here..."
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#4B0082] text-sm font-mono placeholder:text-gray-400 text-gray-800"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center p-3 border rounded-sm bg-[#4B0082] text-white border-[#4B0082] transition-transform duration-300 hover:scale-105"
        >
          <FaPaperPlane className="text-sm" />
        </button>
      </form>

    </div>
  );
}