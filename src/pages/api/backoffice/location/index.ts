// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

const location = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  if (method === "POST") {
    const { name, street, townShip, city, companyId } = req.body;
    const isValid = name && street && townShip && city;
    if (!isValid) return res.status(405).send("Missing Required");

    const location = await prisma.location.create({
      data: { name, street, townShip, city, companyId },
    });
    return res.status(200).json({ location });
  }
  res.status(404).send("Invalid Method");
};

export default location;
