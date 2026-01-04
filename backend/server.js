import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import issueRoutes from "./routes/issue.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`The server is listening on PORT : ${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed");
    console.error(err);
    process.exit(1);
  }
};

startServer();