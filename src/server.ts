import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env" // Docker
      : ".env.local", // Local dev
});

import app from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log("🟢 Database connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Database connection failed:", err));
