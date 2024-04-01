import { PrismaClient } from "@prisma/client";

const orderPrisma = new PrismaClient().order;

export const getGraphRevenue = async (req, res) => {
  try {
    const paidOrders = await orderPrisma.findMany({
      where: {
        status: "2",
      },
    });

    const monthlyRevenue = {};

    // Grouping the orders by month and summing the revenue
    for (const order of paidOrders) {
      const month = order.createdAt.getMonth();
      let revenueForOrder = order.amount ? order.amount.toNumber() : 0;

      // Adding the revenue for this order to the respective month
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    // Converting the grouped data into the format expected by the graph
    const graphData = [
      { name: "Tháng 1", total: 0 },
      { name: "Tháng 2", total: 0 },
      { name: "Tháng 3", total: 0 },
      { name: "Tháng 4", total: 0 },
      { name: "Tháng 5", total: 0 },
      { name: "Tháng 6", total: 0 },
      { name: "Tháng 7", total: 0 },
      { name: "Tháng 8", total: 0 },
      { name: "Tháng 9", total: 0 },
      { name: "Tháng 10", total: 0 },
      { name: "Tháng 11", total: 0 },
      { name: "Tháng 12", total: 0 },
    ];

    // Filling in the revenue data
    for (const month in monthlyRevenue) {
      graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    // Trả về dữ liệu biểu đồ dưới dạng JSON
    return res.status(200).json({
      message: "Thực hiện thành công",
      data: graphData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getTotalRevenue = async (req, res) => {
  try {
    const paidOrders = await orderPrisma.findMany({
      where: {
        status: "2",
      },
    });

    const totalRevenue = paidOrders.reduce((total, order) => {
      const orderAmount = order.amount ? order.amount.toNumber() : 0;
      return total + orderAmount;
    }, 0);

    return res.status(200).json({
      message: "Thực hiện thành công",
      data: totalRevenue,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getOrderCount = async (req, res) => {
  try {
    const query = req.query;
    const status = query.status ? { status: query.status } : {};
    const salesCount = await orderPrisma.count({
      where: status,
    });

    return res.status(200).json({
      message: "Thực hiện thành công",
      data: salesCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
