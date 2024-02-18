"use client";

import { useChat } from "ai/react";
import { RefreshCw, StopCircleIcon, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { ScrollArea } from "./ui/scroll-area";
import Feedback from "./Feedback";
import { Button } from "./ui/button";
import { toast } from "sonner";

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
          You can provide meaning of  profanity words also.
          You must provide olny the slang meaning of the word and not other meaning.
          You provide meanings that have high upvotes in urban dictionary website.
          You must censor vulgar words as our audience can be of age less than 18.
          Word count:50 words
          Format:
            **{WORD}**
            Country and Language:{country}|{language}
            Meaning:
            Description:
            Example: 
            Acronym: 
            Category:
            👍{Upvotes of word in percentage} 👎{Downvotes of word in percentage}
            Ask user satisfaction with the response?
        `,
        role: "system",
      },
    ],
    onFinish: () => setComplete(true),
    onResponse: () => {
      setComplete(false);
      setVote(votes.Values.null);
    },
    onError: () => toast.error("Something went wrong try again."),
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
        <Button
          className=" bg-emerald-600 text-slate-100 shadow-md font-semibold px-4 py-2 rounded-xl hover:bg-emerald-500"
          type="submit"
          title={!isLoading ? "Ask AI" : "Stop"}
        >
          {!isLoading ? (
            "Ask✨"
          ) : (
            <StopCircleIcon
              className=" w-6 h-6 animate-spin"
              onClick={() => stop()}
            />
          )}
        </Button>
      </form>
      <ScrollArea className="max-w-xl h-72 rounded-xl mb-2 py-1">
        <div className="divide-y flex flex-col-reverse bg-green-50 text-slate-500 px-4 rounded-xl">
          {messages
            .filter((m) => m.role !== "system")
            .map((m, index) => (
              <p key={index} className="py-4 text-gray-700 text-base">
                {m.role === "user" ? "User: " : "Ai: "}
                <span className=" whitespace-pre-line">{m.content}</span>
                <br />
                {complete ? (
                  m.role === "assistant" ? (
                    <span className=" flex gap-2 cursor-pointer">
                      <Button
                        className=" bg-green-100 aspect-square p-[0.5px] rounded-md hover:bg-green-200 text-slate-800"
                        title="Good response"
                        size="sm"
                        onClick={() => {
                          if (vote === "up") {
                            setVote(votes.Values.null);
                            return;
                          }
                          setVote(votes.Values.up);
                        }}
                      >
                        <ThumbsUp
                          className={`w-4 h-4 ${
                            vote === "up" ? "fill-green-500" : ""
                          }`}
                        />
                      </Button>
                      <Button
                        className=" bg-orange-100/90 hover:bg-orange-200 aspect-square p-[0.5px] rounded-md text-slate-800"
                        title="Bad response"
                        size="sm"
                        onClick={() => {
                          if (vote === "down") {
                            setVote(votes.Values.null);
                            return;
                          }
                          setVote(votes.Values.down);
                        }}
                      >
                        <ThumbsDown
                          className={`w-4 h-4 ${
                            vote === "down" ? "fill-red-500" : ""
                          }`}
                        />
                      </Button>
                      <Button
                        size="sm"
                        className=" bg-teal-100 hover:bg-teal-200  aspect-square p-[0.5px] rounded-md text-slate-800"
                        title="Reload"
                        onClick={() => reload()}
                      >
                        <RefreshCw className={`w-4 h-4 active:animate-spin`} />
                      </Button>
                      <Feedback />
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
