import { Prisma } from "@prisma/client";
import { z } from "zod";

export const BookSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(2000),
  price: z
    .instanceof(Prisma.Decimal)
    .refine((price) => price.gte("0.01") && price.lt("1000000.00")),
});
