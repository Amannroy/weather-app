import express from "express";
import "./database.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import weatherRoutes from "./routes/weather.js";
import cors from 'cors';
import bodyParser from "body-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3300;

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/weather", weatherRoutes);

app.get("/ping", (req, res) => {
  res.send("Pong");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
