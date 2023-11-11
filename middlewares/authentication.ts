import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const userPrisma = new PrismaClient().user;

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Bạn chưa đăng nhập" });

    const token = authHeader.split(" ")[1] as string;
    const { id } = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;

    const user = await userPrisma.findUnique({ where: id });
    if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });
    next();
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
