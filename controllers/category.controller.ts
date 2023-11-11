import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const categoryPrisma = new PrismaClient().category;

export const createCategory = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const category = await categoryPrisma.create({
      data: body,
    });

    if (!category) return res.status(400).json({ message: "Thêm thất bại" });

    return res
      .status(201)
      .json({ message: "Thêm thành công", data: category });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const itemPerPage = Number(query.item_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = page > 1 ? (page - 1) * itemPerPage : 0;
    const total = await categoryPrisma.count();

    const categories = await categoryPrisma.findMany({
      take: itemPerPage,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Thực hiện thành công",
      data: categories,
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

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoryId = Number(id);
    const category = await categoryPrisma.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        books: true,
      },
    });

    if (!category)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });

    return res
      .status(200)
      .json({ message: "Thực hiện thành công", data: { ...category } });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoryId = Number(id);
    const body = req.body;

    const categoryById = await categoryPrisma.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!categoryById)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });

    const category = await categoryPrisma.update({
      where: {
        id: categoryId,
      },
      data: body,
    });

    if (!category) return res.status(400).json({ message: "Cập nhật thất bại" });

    return res
      .status(200)
      .json({ message: "Cập nhật thành công", data: category });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoryId = Number(id);
    const categoryById = await categoryPrisma.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!categoryById)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });

    const category = await categoryPrisma.delete({
      where: { id: categoryId },
    });

    if (!category) return res.status(400).json({ message: "Xoá thất bại" });

    return res.status(200).json({ message: "Xoá thành công" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
