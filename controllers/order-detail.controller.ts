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
      if (!order) return res.status(400).json({ message: "Không tìm thấy đơn hàng" });

      const book = await bookPrisma.findUnique({
        where: {
          id: item.bookId,
        },
      });
      if (!book) return res.status(400).json({ message: "Không tìm thấy sách" });

      const orderDetail = await orderDetailPrisma.create({
        data: item,
      });

      if (orderDetail) {
        data.push(orderDetail);
      }

      if (!orderDetail)
        return res.status(400).json({ message: "Thêm thất bại" });
    }

    return res.status(201).json({ message: "Thêm thành công", data: data });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAllOrderDetails = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const itemPerPage = Number(query.item_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = page > 1 ? (page - 1) * itemPerPage : 0;
    const total = await orderDetailPrisma.count();

    const orderDetails = await orderDetailPrisma.findMany({
      take: itemPerPage,
      skip,
      include: {
        book: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Thực hiện thành công",
      data: orderDetails,
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
        promotion: true,
      },
    });

    if (!book) return res.status(404).json({ message: "Không tìm thấy sách" });

    return res
      .status(200)
      .json({ message: "Thực hiện thành công", data: book });
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

    if (!bookById) return res.status(404).json({ message: "Không tìm thấy sách" });

    const book = await bookPrisma.update({
      where: {
        id: bookId,
      },
      data: body,
    });

    if (!book) return res.status(400).json({ message: "Cập nhật thất bại" });

    return res
      .status(200)
      .json({ message: "Cập nhật thành công", data: book });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
