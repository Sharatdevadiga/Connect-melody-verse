import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/connect.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/authRoutes.js";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// CONNECT TO DATABASE
connectDB();

// cors
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://connect-melody-verse.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ROUTES
app.use("/api/v1/auth", authRouter);

// sTART THE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Server started successfully on port", PORT);
});
