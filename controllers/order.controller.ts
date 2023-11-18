import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import shortUUID from "short-uuid";

const orderPrisma = new PrismaClient().order;
const userPrisma = new PrismaClient().user;

export const createOrder = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const userId = body.userId;

    const user = await userPrisma.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const order = await orderPrisma.create({
      data: { ...body, code: shortUUID.generate() },
    });

    if (!order) return res.status(400).json({ message: "Đặt hàng thất bại" });

    return res
      .status(201)
      .json({ message: "Đặt hàng thành công", data: order });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const searchTerm = query.code ? query.code.toString() : "";
    const itemPerPage = Number(query.item_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = page > 1 ? (page - 1) * itemPerPage : 0;

    const whereCondition: Prisma.OrderWhereInput = {
      code: {
        contains: searchTerm,
      },
    };
    const total = await orderPrisma.count({
      where: whereCondition,
    });

    const orders = await orderPrisma.findMany({
      take: itemPerPage,
      skip,
      where: whereCondition,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            address: true,
            phone: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Thực hiện thành công",
      data: orders,
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

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderId = Number(id);
    const order = await orderPrisma.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderDetails: {
          select: {
            id: true,
            orderId: true,
            bookId: true,
            book: true,
            quantity: true,
          },
        },
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            address: true,
            phone: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!order) return res.status(404).json({ message: "Không tìm thấy sách" });

    return res.status(200).json({
      message: "Thực hiện thành công",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderId = Number(id);
    const body = req.body;

    const orderById = await orderPrisma.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!orderById)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    const order = await orderPrisma.update({
      where: {
        id: orderId,
      },
      data: {
        phone: body.phone,
        address: body.address,
        status: body.status,
      },
    });

    if (!order) return res.status(400).json({ message: "Cập nhật thất bại" });

    return res
      .status(200)
      .json({ message: "Cập nhật thành công", data: order });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
