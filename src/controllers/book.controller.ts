import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const bookPrisma = new PrismaClient().book;
const genrePrisma = new PrismaClient().genre;

export const createBook = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await bookPrisma.create({
      data: body,
    });

    if (!book) return res.status(400).json({ message: "Failed added" });

    return res.status(201).json({ message: "Successfully added", data: book });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
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

export const getBookById = async (req: Request, res: Response) => {
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

    const genreIds = book.genres.map((genre) => genre.genreId);
    const genres = await genrePrisma.findMany({
      where: {
        id: {
          in: genreIds,
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully executed", data: { ...book, genres } });
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

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookId = Number(id);
    const bookById = await bookPrisma.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!bookById) return res.status(404).json({ message: "Book not found" });

    const book = await bookPrisma.delete({
      where: { id: bookId },
    });

    if (!book) return res.status(400).json({ message: "Failed deleted" });

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
