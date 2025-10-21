import { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

type Expiry = "1h" | "2h" | "12h" | "1d" | "7d" | "30d" | "5m" | "15m" | "60m";

// Create a JWT token
export const createToken = (id: string, email: string, expiresIn: Expiry): string => {
  const payload = { id, email };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};

// Verify JWT token from signed cookie
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies[COOKIE_NAME];

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    // decode and verify token
    const decoded = jwt.verify(token, secret) as { id: string; email: string };

    // store payload in res.locals for downstream middleware/routes
    res.locals.jwtData = decoded;

    next();
  } catch (err: any) {
    return res.status(401).json({ message: err.message || "Invalid or Expired Token" });
  }
};
