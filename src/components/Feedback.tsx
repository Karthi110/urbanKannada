"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Feedback = () => {
  const [input, setInput] = useState<string>();
  const [isopen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    setInput("");
    setIsOpen(false);
    toast.success("Feedback submitted! Thank you for the feedback.");
  };
  return (
    <Popover open={isopen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          title="feedback"
          size="sm"
          variant="ghost"
          className="transition aspect-square p-[0.5px] data-[state=open]:rotate-180"
        >
          <ChevronUp className=" w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2">
        <form
          className=" flex flex-col gap-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className=" text-sm font-medium text-slate-600">
            Submit feedback.
          </h1>
          <textarea
            className="w-full h-[80%] border border-gray-200 rounded-lg text-sm  text-slate-500 px-2 py-1"
            value={input}
            required
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <Button
            className=" w-fit h-fit text-xs font-medium px-2 py-1 bg-slate-600"
            type="submit"
          >
            submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default Feedback;
