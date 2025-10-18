// src/controller/chat-controllers.ts
import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureGroq } from "../config/groq-config.js";

type ChatCompletionRequestMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });

    // Get user's existing chats
    const chats = (user.chats as ChatCompletionRequestMessage[]).map(
      ({ role, content }) => ({ role, content })
    );

    // Add the new user message
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // Create Groq client using configureGroq function
    const groq = configureGroq();

    // ✅ Updated to use the latest supported Groq model
    const chatResponse = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ⚡ Fast and currently supported
      messages: chats,
    });

    // Extract assistant's reply
    const assistantMessage = chatResponse.choices[0]?.message;
    if (assistantMessage) {
      user.chats.push(assistantMessage);
      await user.save();
    }

    return res.status(200).json({ chats: user.chats });
  } catch (error: any) {
    console.error("Groq API Error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    // Clear chat history
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
