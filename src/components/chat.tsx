"use client";

import { useChat } from "ai/react";
import { Loader2 } from "lucide-react";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "api/chat",
      initialMessages: [
        {
          id: "",
          content: `
          Task: Give the slang meaning of the word .Ask the user about it if you don't get the meaning of the word
          Topic: Urban Dictionary
          Style: Formal
          Tone: Assertive and Never Apologize
          Audience: teenager and less then 18 years old
          Word Count: 30-40 words
          Format:[
          **{WORD}**
          Country and Language: 
          Meaning:
          Description:
          Example: 
          Acronym: 
          Type:
          Translation in Kannada:{word} {word lexicon}
          👍{Upvotes of word in percentage} 👎{Downvotes of word in percentage}
        ]
        `,
          role: "system",
        },
      ],
    });

  return (
    <div className="md:max-w-xl max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className=" flex gap-4 pb-2">
        <input
          placeholder="Type the word.."
          value={input}
          onChange={handleInputChange}
          className=" w-full border rounded-xl border-slate-100/80 py-2 px-4 shadow-md"
        />
        <button
          className=" bg-emerald-600 text-slate-100 shadow-md font-semibold px-4 py-2 rounded-xl hover:bg-emerald-500"
          type="submit"
          disabled={isLoading}
        >
          {!isLoading ? "Ask✨" : <Loader2 className=" w-4 h-4 animate-spin" />}
        </button>
      </form>
      <div className="divide-y flex flex-col-reverse bg-green-50 text-slate-500 px-4 rounded-xl">
        {messages
          .filter((m) => m.role !== "system")
          .map((m, index) => (
            <p key={index} className=" py-4 ">
              {m.role === "user" ? "User: " : "Ai: "}
              <span className=" whitespace-pre-line">{m.content}</span>
            </p>
          ))}
      </div>
    </div>
  );
};

export default Chat;
