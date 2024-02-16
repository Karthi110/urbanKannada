import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = "edge";

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(apiConfig);

export async function POST(req: Request) {
  const { messages } = await req.json();
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: messages,
    temperature: 1,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
