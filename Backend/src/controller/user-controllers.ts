import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { CookieOptions } from "express";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

const isProd = process.env.NODE_ENV === "production";
const cookieOptions: CookieOptions = {
  httpOnly: true,
  signed: true,
  path: "/",
  secure: isProd,
  sameSite: isProd ? "none" : "lax",  
 
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // clear previous cookie
    res.clearCookie(COOKIE_NAME, cookieOptions);

    // create new token
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // store cookie
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, expires });

    return res.status(201).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("User not registered");

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) return res.status(403).send("Incorrect Password");

    // clear old cookie
    res.clearCookie(COOKIE_NAME, cookieOptions);

    // create token
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // store cookie
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, expires });

    return res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).send("User not registered OR Token malfunctioned");
    return res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).send("User not registered OR Token malfunctioned");

    // remove cookie
    res.clearCookie(COOKIE_NAME, cookieOptions);
    return res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
