import { PrismaClient } from "@prisma/client";

const orderDetailPrisma = new PrismaClient().orderDetail;
const orderPrisma = new PrismaClient().order;
const bookPrisma = new PrismaClient().book;

export const createOrderDetail = async (req, res) => {
  try {
    const body = req.body;
    const data= [];

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
