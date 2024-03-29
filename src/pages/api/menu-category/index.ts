// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const app = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(404).send("Unauthorized");
  const method = req.method;
  if (method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.status(405).send("Missing Required Datas");
    const location = await prisma.location.findFirst({
      where: { id: locationId },
    });
    if (!location) return res.status(404).send("Data Not Found");
    const menuCategories = await prisma.menucategory.create({
      data: { name, companyId: location.companyId },
    });
    return res.status(200).json({ menuCategories });
  }
  res.status(400).send("Invalid Method");
};
export default app;
