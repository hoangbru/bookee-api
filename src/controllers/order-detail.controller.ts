import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const orderDetailPrisma = new PrismaClient().orderDetail;
const orderPrisma = new PrismaClient().order;
const bookPrisma = new PrismaClient().book;

export const createOrderDetail = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data: any[] = [];

    for (const item of body) {

      const order = await orderPrisma.findUnique({
        where: {
          id: item.orderId,
        },
      });
      if (!order) return res.status(400).json({ message: "Order not found" });

      const book = await orderPrisma.findUnique({
        where: {
          id: item.bookId,
        },
      });
      if (!book) return res.status(400).json({ message: "Book not found" });

      const existingOrderDetail = await orderDetailPrisma.findMany({
        where: {
          orderId: item.orderId,
          bookId: item.bookId
        }
      })

      if(existingOrderDetail) return res.status(400).json({ message: "Order detail already exists" });

      const orderDetail = await orderDetailPrisma.create({
        data: item,
      });

      if (orderDetail) {
        data.push(orderDetail);
      }

      if (!orderDetail)
        return res.status(400).json({ message: "Failed added" });
    }

    return res.status(201).json({ message: "Successfully added", data: data });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAllOrderDetails = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const itemPerPage = Number(query.item_per_page) || 9;
    const page = Number(query.page) || 1;
    const skip = page > 1 ? (page - 1) * itemPerPage : 0;
    const total = await bookPrisma.count();

    const books = await bookPrisma.findMany({
      take: itemPerPage,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Successfully excuted",
      data: books,
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

export const getOrderDetailById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookId = Number(id);
    const book = await bookPrisma.findUnique({
      where: {
        id: bookId,
      },
      include: {
        genres: true,
        promotion: true,
      },
    });

    if (!book) return res.status(404).json({ message: "Book not found" });

    return res
      .status(200)
      .json({ message: "Successfully executed", data: book });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateOrderDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookId = Number(id);
    const body = req.body;

    const bookById = await bookPrisma.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!bookById) return res.status(404).json({ message: "Book not found" });

    const book = await bookPrisma.update({
      where: {
        id: bookId,
      },
      data: body,
    });

    if (!book) return res.status(400).json({ message: "Failed updated" });

    return res
      .status(200)
      .json({ message: "Successfully updated", data: book });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
