"use client";

import { useChat } from "ai/react";
import {
  Loader2,
  RefreshCw,
  StopCircleIcon,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { ScrollArea } from "./ui/scroll-area";

const Chat = () => {
  const votes = z.enum(["up", "down", "null"]);
  const [vote, setVote] = useState<string>();
  const [complete, setComplete] = useState<boolean>(false);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
  } = useChat({
    api: "api/chat",
    initialMessages: [
      {
        id: "",
        content: `
          You are a Urban dictionary.
          You must provide olny the slang meaning of the word and not other meaning.
          You provide meanings that have high upvotes in urban dictionary.
          You must censor vulgar and Illegal words as our audience can be of age less than 18.
          You provide output in the below format.
          Word count:30-40 words
          Format:
            **{WORD}**
            Country and Language:
            Meaning:
            Description:
            Example: 
            Acronym: 
            Type:
            Translation in Kannada:{word} {word lexicon}
            👍{Upvotes of word in percentage} 👎{Downvotes of word in percentage}
            Ask whether the user is satisfied with the response?
        `,
        role: "system",
        ui: [<Loader2 className="w-4 h-4" />, <User />],
      },
    ],
    onFinish: () => setComplete(true),
    onResponse: () => {
      setComplete(false);
      setVote(votes.Values.null);
    },
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
          title={!isLoading ? "Ask AI" : "Stop"}
        >
          {!isLoading ? (
            "Ask✨"
          ) : (
            <StopCircleIcon
              className=" w-4 h-4 animate-spin"
              onClick={() => stop()}
            />
          )}
        </button>
      </form>
      <ScrollArea className="max-w-xl aspect-video bg-transparent rounded-xl mb-4">
        <div className="divide-y flex flex-col-reverse bg-green-50 text-slate-500 px-4 rounded-xl">
          {messages
            .filter((m) => m.role !== "system")
            .map((m, index) => (
              <p key={index} className=" py-4 text-gray-700 text-lg">
                {m.role === "user" ? "User: " : "Ai: "}
                <span className=" whitespace-pre-line">{m.content}</span>
                <br />
                {complete ? (
                  m.role === "assistant" ? (
                    <span className=" flex gap-4 cursor-pointer">
                      <button
                        className=" bg-green-100  aspect-square p-1 rounded-md"
                        title="Good response"
                      >
                        <ThumbsUp
                          onClick={() => {
                            if (vote === "up") {
                              setVote(votes.Values.null);
                              return;
                            }
                            setVote(votes.Values.up);
                          }}
                          className={`w-5 h-5 ${
                            vote === "up" ? "fill-slate-400" : ""
                          }`}
                        />
                      </button>
                      <button
                        className=" bg-orange-100  aspect-square p-1 rounded-md"
                        title="Bad response"
                      >
                        <ThumbsDown
                          onClick={() => {
                            if (vote === "down") {
                              setVote(votes.Values.null);
                              return;
                            }
                            setVote(votes.Values.down);
                          }}
                          className={`w-5 h-5 ${
                            vote === "down" ? "fill-slate-400" : ""
                          }`}
                        />
                      </button>
                      <button
                        className=" bg-teal-100  aspect-square p-1 rounded-md"
                        title="Reload"
                      >
                        <RefreshCw
                          className={`w-5 h-5 active:animate-spin`}
                          onClick={() => reload()}
                        />
                      </button>
                    </span>
                  ) : null
                ) : null}
              </p>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Chat;
