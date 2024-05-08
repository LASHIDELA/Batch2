// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const location = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  const session = await getServerSession(req, res, authOptions);
  if (method === "POST") {
    const user = session.user;
    const userName = user.name as string;
    const email = user.email as string;
    const dbUser = await prisma.user.findUnique({ where: { email } });
    if (!dbUser) return res.status(400).send("User Email Not Found");
    if (!session) return res.status(400).send("Unautorized");

    const companyId = dbUser.companyId;
    const { name, street, townShip, city } = req.body;
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
