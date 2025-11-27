import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayloadType } from "../types/express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded as JwtPayloadType;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
