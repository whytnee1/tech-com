"use client";

import ChatWindow from "./chat-window";

export default function ChatPage() {
  return (
    <main className="min-h-[calc(100vh-60px)] bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <ChatWindow />
    </main>
  );
}