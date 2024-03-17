// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const menu = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(500).send("Unauto Rize");
  const method = req.method;
  if (method === "POST") {
    const { name, price, menuCategoryId } = req.body;
    const isValid = name && price !== undefined && menuCategoryId.length > 0;
    if (!isValid) return res.status(404).send("Missing Requeire");
    const newMenu = await prisma.menu.create({ data: { name, price } });

    const menuCategoryIds: { menuId: number; menuCategoryId: number }[] =
      menuCategoryId.map((item: number) => ({
        menuId: newMenu.id,
        menuCategoryId: item,
      }));
    const menuCategoryMenu = await prisma.$transaction(
      menuCategoryIds.map((item) =>
        prisma.menuCategoryMenu.create({
          data: { menuCategoryId: item.menuCategoryId, menuId: item.menuId },
        })
      )
    );

    return res.status(200).json({ newMenu, menuCategoryMenu });
  } else if (method === "PUT") {
    const { id, name, price, menuCategoryId } = req.body;
    const isValid =
      id && name && price !== undefined && menuCategoryId.length > 0;
    if (!isValid) return res.status(404).send("Missing Required Datas");
    const updateMenus = await prisma.menu.update({
      data: { name, price },
      where: { id },
    });
    await prisma.menuCategoryMenu.deleteMany({ where: { menuId: id } });

    const menuCategoryMenu: { menuId: number; menuCategoryIds: number }[] =
      menuCategoryId.map((item: number) => ({
        menuId: id,
        menuCategoryIds: item,
      }));
    const updateMenuCategoryMenu = await prisma.$transaction(
      menuCategoryMenu.map((item) =>
        prisma.menuCategoryMenu.create({
          data: { menuCategoryId: item.menuCategoryIds, menuId: item.menuId },
        })
      )
    );
    return res.status(200).json({ updateMenus, updateMenuCategoryMenu });
  } else if (method === "DELETE") {
    const menuId = Number(req.query.id);
    const menus = await prisma.menu.findFirst({ where: { id: menuId } });
    if (!menus) return res.status(404).send("Data Not Found");
    await prisma.menu.update({
      data: { isArchived: true },
      where: { id: menuId },
    });
    return res.status(200).send("OK");
  }
  res.status(500).send("Invalid Method");
};

export default menu;
