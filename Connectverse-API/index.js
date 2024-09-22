const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db"); // Assuming you have a connectDB function

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// CONNECT TO DATABASE
connectDB();

// CORS Configuration
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
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Your routes here
app.use("/api/v1/auth", require("./routes/authRoutes"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
