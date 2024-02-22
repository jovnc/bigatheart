"use server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function sendMessageToOpenAI(message) {
  let systemMessage =
    "You are a helpful assistant who only helps to create the description for a non-profit organisation event. If the user does not provide, sufficient details about the event, ask the user for more details. If the user provides sufficient details, just answer with the event description.";

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: message },
    ],
  });

  return res.choices[0];
}
