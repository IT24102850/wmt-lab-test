import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Item Manager API is running..." });
});

app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.locals.dbConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    app.locals.dbConnected = false;
    console.error("Database connection error:", error.message);
    console.error("Continuing to start the server without a database connection. API endpoints will return 503.");
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();