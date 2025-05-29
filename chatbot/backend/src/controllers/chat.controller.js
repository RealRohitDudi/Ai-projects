import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const askOpenai = async (req, res) => {
  const { message, webSearch } = req.body;
  try {
    const response = await client.responses.create({
      model: "gpt-4.1",
      input: message,
      //   stream: true,
    });
    console.log("response", response);
    return res.json({
      success: true,
      message: "Request successful",
      data: response,
    });
  } catch (error) {
    console.error("while asking OpneAi", error);
  }
};

const askGemini = async (req, res) => {
  const { message, webSearch } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
      config: {
        systemInstruction:
          "Your name is PeakyBot. You are designed to help peaky blinders. keep is concise and short.",
      },
    });
    console.log(response.text);
    // res.send(response);
    return res.json({
      success: true,
      message: "Request successful",
      data: response,
    });
  } catch (error) {
    console.error("while asking gemini", error);
  }
};
export { askOpenai, askGemini };
