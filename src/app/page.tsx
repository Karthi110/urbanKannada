import Chat from "@/components/chat";

export const runtime = "edge";

export default function Home() {
  return (
    <main className=" container mx-auto">
      <div className=" flex flex-col items-center min-h-fit gap-6 w-full mx-auto mt-16 mb-10">
        <h1 className="font-semibold text-slate-700 text-4xl md:text-7xl text-center ">
          The Regional{" "}
          <span className=" transition-colors delay-75 bg-gradient-to-r to-red-500 via-indigo-400 from-green-600 text-transparent bg-clip-text animate-gradient">
            Urban Dictionary
          </span>{" "}
        </h1>
        <p className="text-lg md:text-xl font-medium text-slate-500 text-center w-[90%] md:w-2/3 md:space-x-2">
          Urban<b>ಕನ್ನಡ</b> is an online dictionary that allows people to
          <span className=" transition-colors delay-75 bg-gradient-to-r from-orange-700 via-indigo-500 to-green-400 text-transparent bg-clip-text animate-gradient">
            ask words and expressions{" "}
          </span>
          from all over the world
          <span className=" transition-colors delay-75 bg-gradient-to-r from-orange-700 via-indigo-500 to-green-400 text-transparent bg-clip-text animate-gradient">
            to AI{" "}
          </span>
          and get the meaning in kannada.
        </p>
      </div>
      <Chat />
    </main>
  );
}
