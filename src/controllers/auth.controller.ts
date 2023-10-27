import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authPrisma = new PrismaClient().user;

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const userExist = await authPrisma.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist)
      return res.status(400).json({ message: "User already exists" });

    const hasedPassword = await bcrypt.hash(password, 10);
    const user = await authPrisma.create({
      data: {
        username,
        email,
        password: hasedPassword,
      },
      select: {
        fullName: true,
        username: true,
        email: true,
        phone: true,
        image: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      message: "Registration successful",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authPrisma.findUnique({
      where: {
        email: email,
      },
    });

    if (!user)
      return res.status(404).json({ message: "Account does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Passwords do not match" });

    const token = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "24h",
    });

    const userLogin = {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      image: user.image,
    };

    return res.status(200).json({
      message: "Login successful",
      data: {
        accessToken: token,
        information: userLogin,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
