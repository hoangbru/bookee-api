import { PrismaClient } from "@prisma/client";

const reviewPrisma = new PrismaClient().review;
const userPrisma = new PrismaClient().user;
const bookPrisma = new PrismaClient().book;

export const createReview = async (req, res) => {
  try {
    const body = req.body;
    const userId = Number(body.userId);
    const bookId = Number(body.bookId);

    const user = await userPrisma.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user)
      return res.status(400).json({ message: "Không tìm thấy người dùng" });

    const book = await bookPrisma.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!book) return res.status(400).json({ message: "Không tìm thấy sách" });

    const review = await reviewPrisma.create({
      data: { ...body, userId, bookId, rating: Number(body.rating) },
    });

    if (!review) return res.status(400).json({ message: "Thêm thất bại" });

    return res.status(201).json({ message: "Thêm thành công", data: review });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const body = req.body;
    const reviewId = Number(body.id);

    const reviewById = await reviewPrisma.findUnique({
      where: {
        id: reviewId,
      },
    });
    if (!reviewById)
      return res.status(400).json({ message: "Bình luận không tồn tại" });

    const review = await reviewPrisma.update({
      where: {
        id: reviewId,
      },
      data: { comment: body.comment, id: reviewId },
    });

    if (!review) return res.status(400).json({ message: "Cập nhật thất bại" });

    return res
      .status(201)
      .json({ message: "Cập nhật thành công", data: review });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
