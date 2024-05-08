// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const Addon = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(404).send("Unauthorized");
  const method = req.method;
  if (method === "POST") {
    const { name, addonCategoryId, price } = req.body;
    const isValid = name && price !== undefined && addonCategoryId;
    if (!isValid) return res.status(405).send("Missing Required Datas");
    const newAddon = await prisma.addon.create({
      data: { name, price, addonCategoryId },
    });
    return res.status(200).json({ newAddon });
  } else if (method === "PUT") {
    const { id, name, price, addonCategoryId } = req.body;
    const isValid = name && id && price !== undefined && addonCategoryId;
    if (!isValid) return res.status(405).send("Missing Required Datas");
    const addon = await prisma.addon.findFirst({ where: { id } });
    if (!addon) return res.status(404).send("Data not found");
    const updateAddon = await prisma.addon.update({
      data: { name, price, addonCategoryId },
      where: { id },
    });

    return res.status(200).json({ updateAddon });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = await prisma.addon.findFirst({ where: { id } });
    if (!isValid) return res.status(404).send("Data Invalid");
    await prisma.addonCategory.update({
      where: { id },
      data: { isArchived: true },
    });

    return res.status(200).send("OK");
  }

  res.status(400).send("Invalid Method");
};
export default Addon;
