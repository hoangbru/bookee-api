import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const bookPrisma = new PrismaClient().book;

export const createBook = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const book = await bookPrisma.create({
      data: body,
    });

    if (!book) return res.status(400).json({ message: "Thêm thất bại" });

    return res.status(201).json({ message: "Thêm thành công", data: book });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const itemPerPage = Number(query.item_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = page > 1 ? (page - 1) * itemPerPage : 0;
    const total = await bookPrisma.count();

    const books = await bookPrisma.findMany({
      take: itemPerPage,
      skip,
      include: {
        category: true,
        reviews: true,
        promotion: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Thực hiện thành công",
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

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookId = Number(id);
    const book = await bookPrisma.findUnique({
      where: {
        id: bookId,
      },
      include: {
        category: true,
        reviews: true,
        promotion: true,
      },
    });

    if (!book) return res.status(404).json({ message: "Không tìm thấy sách" });

    return res
      .status(200)
      .json({
        message: "Thực hiện thành công",
        data: {
          ...book,
          category: { id: book.category?.id, name: book.category?.name },
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
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

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookId = Number(id);
    const bookById = await bookPrisma.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!bookById) return res.status(404).json({ message: "Không tìm thấy sách" });

    const book = await bookPrisma.delete({
      where: { id: bookId },
    });

    if (!book) return res.status(400).json({ message: "Xoá thất bại" });

    return res.status(200).json({ message: "Xoá thành công" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
