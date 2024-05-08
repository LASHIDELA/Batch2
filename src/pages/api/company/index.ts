// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const company = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(404).send("Unauthorized");
  const method = req.method;

  if (method === "PUT") {
    const { id, name, street, townShip, city } = req.body;
    const isValid = id && name && street && townShip && city;
    if (!isValid) return res.status(405).send("Missing Required datas");
    const company = await prisma.company.findFirst({ where: { id } });
    if (!company) return res.status(404).send("Data not found");

    const updateCompany = await prisma.company.update({
      data: { name, street, townShip, city },
      where: { id },
    });
    return res.status(200).json({ updateCompany });
  }
  res.status(400).send("Invalid Method");
};
export default company;
