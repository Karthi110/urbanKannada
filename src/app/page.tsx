import Chat from "@/components/chat";

export const runtime = "edge";

export default function Home() {
  return (
    <main className=" container mx-auto">
      <div className=" flex flex-col items-center min-h-fit gap-4 w-full mx-auto mt-10 mb-4">
        <h1 className="font-semibold text-slate-700 text-4xl md:text-6xl lg:text-7xl text-center ">
          The Regional <span className="text-gradient">Urban Dictionary</span>{" "}
        </h1>
        <p className="text-lg md:text-xl font-medium text-slate-500 text-center w-[90%] lg:w-[75%] md:space-x-2">
          Urban<b>ಕನ್ನಡ</b> is an online dictionary that allows people to
          <span className="text-gradient">ask words and expressions </span>
          from all over the world
          <span className="text-gradient">to AI </span>
          and get the meaning in kannada.
        </p>
      </div>
      <Chat />
    </main>
  );
}
