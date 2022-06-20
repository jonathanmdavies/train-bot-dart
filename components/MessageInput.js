import { useState } from "react";

export default function MessageInput({ handleSubmit, input, setInput }) {
  return (
    <div className="flex items-stretch mt-4">
      <label htmlFor="message" className="sr-only">
        Message
      </label>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
        id="message"
        placeholder="Ask me about a station"
        type="text"
        className="w-full transition border-0 rounded-lg ring-2 focus:border-0 ring-transparent focus:ring-emerald-500"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-emerald-500 transition hover:bg-emerald-600 px-4 ml-2 rounded-lg text-white"
      >
        Send
      </button>
    </div>
  );
}
