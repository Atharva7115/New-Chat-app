import { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
type Expiry = "1h" | "2h" | "12h" | "1d" | "7d" | "30d" | "5m" | "15m" | "60m";
export const createToken = (id: string, email: string, expiresIn: Expiry): string => {
  const payload = { id, email };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // Ensure options are typed correctly
  const options: SignOptions = {
    expiresIn: expiresIn, // e.g., "1h", "7d", etc.
  };

  const token = jwt.sign(payload, secret, options);
  return token;
};


export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};


// export const verifyToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.signedCookies[COOKIE_NAME];

//   if (!token || token.trim() === "") {
//     return res.status(401).json({ message: "Token Not Received" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
//     if (err || !decoded) {
//       console.error("JWT error:", err?.message);
//       return res.status(401).json({ message: "Token Expired or Invalid" });
//     }

//     res.locals.jwtData = decoded;
//     next();
//   });
// };

