import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log("🟢 Database connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Database connection failed:", err));
