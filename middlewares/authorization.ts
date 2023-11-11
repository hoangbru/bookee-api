import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const userPrisma = new PrismaClient().user;

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Bạn chưa đăng nhập" });

    const token = authHeader.split(" ")[1] as string;
    const decode = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;
    console.log(decode)
    const user = await userPrisma.findUnique({ where: decode.id });
    if (user?.role !== "ADMIN")
      return res.status(403).json({ message: "Bạn không có quyền" });
    next();
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
