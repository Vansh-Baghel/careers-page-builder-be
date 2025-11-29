import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production"
    ? ".env"         // Docker
    : ".env.local", // Local dev
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
