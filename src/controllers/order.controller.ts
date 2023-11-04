import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { generateRandomString } from "../helpers/randomString";

const orderPrisma = new PrismaClient().order;
const orderDetailPrisma = new PrismaClient().orderDetail;
const userPrisma = new PrismaClient().user;

export const createOrder = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const userId = body.userId;
    const orderAmount = body.items
      ? body.items.reduce((sum: any, item: any) => {
          return sum + item.price * item.quantity;
        }, 0)
      : 0;

    const user = await userPrisma.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const order = await orderPrisma.create({
      data: { ...body, code: generateRandomString(), amount: orderAmount },
    });

    if (!order) return res.status(400).json({ message: "Failed added" });

    return res.status(201).json({ message: "Successfully added", data: order });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const itemPerPage = Number(query.item_per_page) || 9;
    const page = Number(query.page) || 1;
    const skip = page > 1 ? (page - 1) * itemPerPage : 0;
    const total = await orderPrisma.count();

    const orders = await orderPrisma.findMany({
      take: itemPerPage,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Successfully excuted",
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
        user: {
          select: {
            fullName: true,
            username: true,
            email: true,
            image: true,
          },
        },
        orderDetails: true,
      },
    });

    if (!order) return res.status(404).json({ message: "Book not found" });

    const orderDetailIds = order.orderDetails.map((item) => item.orderId);
    const orderDetails = await orderDetailPrisma.findMany({
      where: {
        id: {
          in: orderDetailIds,
        },
      },
    });

    return res.status(200).json({
      message: "Successfully executed",
      data: { ...order, orderDetails },
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

    if (!orderById) return res.status(404).json({ message: "Order not found" });

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

    if (!order) return res.status(400).json({ message: "Failed updated" });

    return res
      .status(200)
      .json({ message: "Successfully updated", data: order });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
