import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

interface CustomRequest extends Request {
  user?: User | null; 
}

const generateToken = (userId: string): string => {
  const secretKey = process.env.JWT_SECRET_KEY || "default_secret_key";
  return jwt.sign({ id: userId }, secretKey, { expiresIn: "30d" });
};

const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return; // Exit the function after sending a response
  }

  const Token = token.startsWith("Bearer ") ? token.slice(7) : token;

  try {
    const secretKey = process.env.JWT_SECRET_KEY || "default_secret_key";
    const decoded = jwt.verify(Token, secretKey) as { id: string };

    req.user = await User.findByPk(decoded.id);
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return; // Exit the function after sending a response
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
    return; // Exit the function after sending a response
  }
};

export { authMiddleware, generateToken };
