import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const booksGenresPrisma = new PrismaClient().booksGenres;

export const createBooksGenres = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const bookId = Number(body.bookId);
    const genreId = Number(body.genreId);
    const booksGenres = await booksGenresPrisma.create({
      data: {
        bookId,
        genreId,
      },
    });

    if (!booksGenres) return res.status(400).json({ message: "Failed added" });

    return res
      .status(201)
      .json({ message: "Successfully added", data: booksGenres });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAllBooksGenres = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const itemPerPage = Number(query.item_per_page) || 9;
    const page = Number(query.page) || 1;
    const skip = page > 1 ? (page - 1) * itemPerPage : 0;
    const total = await booksGenresPrisma.count();

    const booksGenres = await booksGenresPrisma.findMany({
      take: itemPerPage,
      skip,
      include: {
        book: true,
        genre: true,
      },
    });
    
    return res.status(200).json({
      message: "Successfully excuted",
      data: booksGenres,
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

// export const updateBooksGenres = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const bookId = Number(id);
//     const body = req.body;

//     const bookById = await bookPrisma.findUnique({
//       where: {
//         id: bookId,
//       },
//     });

//     if (!bookById) return res.status(404).json({ message: "Book not found" });

//     const book = await bookPrisma.update({
//       where: {
//         id: bookId,
//       },
//       data: body,
//     });

//     if (!book) return res.status(400).json({ message: "Failed updated" });

//     return res
//       .status(200)
//       .json({ message: "Successfully updated", data: book });
//   } catch (error) {
//     return res.status(500).json({
//       message: error,
//     });
//   }
// };

// export const deleteBooksGenres = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const bookId = Number(id);
//     const bookById = await bookPrisma.findUnique({
//       where: {
//         id: bookId,
//       },
//     });

//     if (!bookById) return res.status(404).json({ message: "Book not found" });

//     const book = await bookPrisma.delete({
//       where: { id: bookId },
//     });

//     if (!book) return res.status(400).json({ message: "Failed deleted" });

//     return res.status(200).json({ message: "Successfully deleted" });
//   } catch (error) {
//     return res.status(500).json({
//       message: error,
//     });
//   }
// };
