import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const userPrisma = new PrismaClient().user;

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const itemPerPage = Number(query.item_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = page > 1 ? (page - 1) * itemPerPage : 0;
    const total = await userPrisma.count();

    const users = await userPrisma.findMany({
      take: itemPerPage,
      skip,
      where: {
        NOT: {
          role: "ADMIN",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Thực hiện thành công",
      data: users,
      result: {
        currentPage: page,
        itemPerPage,
        total,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = Number(id);
    const user = await userPrisma.findUnique({
      where: {
        id: userId,
      },
      include: {
        orders: {
          select: {
            id: true,
            code: true,
            orderType: true,
            userId: true,
            user: true,
            fullName: true,
            address: true,
            phone: true,
            email: true,
            status: true,
            amount: true,
            orderDetails: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        reviews: true,
      },
    });

    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    return res.status(200).json({
      message: "Thực hiện thành công",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = Number(id);
    const body = req.body;

    const userById = await userPrisma.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userById)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const user = await userPrisma.update({
      where: {
        id: userId,
      },
      data: body,
    });

    if (!user) return res.status(400).json({ message: "Cập nhật thất bại" });

    return res.status(200).json({ message: "Cập nhật thành công", data: user });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = Number(id);
    const userById = await userPrisma.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userById)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const user = await userPrisma.delete({
      where: { id: userId },
    });

    if (!user) return res.status(400).json({ message: "Xoá thất bại" });

    return res.status(200).json({ message: "Xoá thành công" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
