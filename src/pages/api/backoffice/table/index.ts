// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import { getImageUrl, imageUrl } from "@/utils/fileUpload";
import type { NextApiRequest, NextApiResponse } from "next";

const table = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  if (method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.status(405).send("Missing Required Datas");
    let newTable = await prisma.table.create({
      data: { name, locationId, qrcodeUrl: "" },
    });

    const tableId = newTable.id;
    imageUrl(tableId);
    const quImageUrl = getImageUrl(tableId);
    newTable = await prisma.table.update({
      data: { qrcodeUrl: quImageUrl },
      where: { id: tableId },
    });

    return res.status(200).json({ newTable });
  } else if (method === "PUT") {
    const { id, name } = req.body;
    const isValid = id && name;
    if (!isValid) return res.status(405).send("Missing Required datas");
    const table = await prisma.table.findFirst({ where: { id } });
    if (!table) return res.status(404).send("Data not found");

    const updateTable = await prisma.table.update({
      data: { name },
      where: { id },
    });
    return res.status(200).json({ updateTable });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = await prisma.table.findFirst({ where: { id } });
    if (!isValid) return res.status(404).send("Data not found");

    await prisma.table.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("OK");
  }
  res.status(400).send("Invalid Method");
};
export default table;
