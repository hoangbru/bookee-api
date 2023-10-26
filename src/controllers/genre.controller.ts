import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const genrePrisma = new PrismaClient().genre;

export const createGenre = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const genre = await genrePrisma.create({
      data: body,
    });

    if (!genre) return res.status(400).json({ message: "Failed added" });

    return res.status(201).json({ message: "Successfully added", data: genre });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const itemPerPage = Number(query.item_per_page) || 9;
    const page = Number(query.page) || 1;
    const skip = page > 1 ? (page - 1) * itemPerPage : 0;
    const total = await genrePrisma.count();

    const genres = await genrePrisma.findMany({
      take: itemPerPage,
      skip,
      include: {
        books: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Successfully excuted",
      data: genres,
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

export const getGenreById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const genreId = Number(id);
    const genre = await genrePrisma.findUnique({
      where: {
        id: genreId,
      },
      include: {
        books: true,
      },
    });

    if (!genre) return res.status(404).json({ message: "Genre not found" });
    return res
      .status(200)
      .json({ message: "Successfully excuted", data: genre });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const genreId = Number(id);
    const body = req.body;

    const genreById = await genrePrisma.findUnique({
      where: {
        id: genreId,
      },
    });

    if (!genreById) return res.status(404).json({ message: "Book not found" });

    const genre = await genrePrisma.update({
      where: {
        id: genreId,
      },
      data: body,
    });

    if (!genre) return res.status(400).json({ message: "Failed updated" });

    return res
      .status(200)
      .json({ message: "Successfully updated", data: genre });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const genreId = Number(id);
    const genreById = await genrePrisma.findUnique({
      where: {
        id: genreId,
      },
    });

    if (!genreById) return res.status(404).json({ message: "Genre not found" });

    const genre = await genrePrisma.delete({
      where: { id: genreId },
    });

    if (!genre) return res.status(400).json({ message: "Failed deleted" });

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
