import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,  
].filter(Boolean);


app.use(
  cors({
    origin: allowedOrigins,   
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
