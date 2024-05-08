// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const AddonCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(404).send("Unauthorized");
  const method = req.method;
  if (method === "POST") {
    const { name, menuIds } = req.body;
    const isValid = name && menuIds.length > 0;
    if (!isValid) return res.status(405).send("Missing Required Datas");
    const newAddonCategory = await prisma.addonCategory.create({
      data: { name, isRequired: true },
    });

    const menuAddonCategoryDatas: {
      menuId: number;
      addonCategoryId: number;
    }[] = menuIds.map((item: number) => ({
      menuId: item,
      addonCategoryId: newAddonCategory.id,
    }));
    const newMenuAddonCategories = await prisma.$transaction(
      menuAddonCategoryDatas.map((item) =>
        prisma.menuAddonCategory.create({
          data: { menuId: item.menuId, addonCategoryId: item.addonCategoryId },
        })
      )
    );

    return res.status(200).json({ newAddonCategory, newMenuAddonCategories });
  } else if (method === "PUT") {
    const { name, id, isRequired, menuIds } = req.body;
    const isValid = name && id && menuIds.length > 0;
    if (!isValid) return res.status(405).send("Missing Required Datas");

    const updateAddonCategory = await prisma.addonCategory.update({
      data: { name, isRequired },
      where: { id },
    });

    await prisma.menuAddonCategory.deleteMany({
      where: { addonCategoryId: id },
    });
    const menuAddonCategoryIds: { addonCategoryId: number; menuIds: number }[] =
      menuIds.map((item: number) => ({
        addonCategoryId: id,
        menuIds: item,
      }));
    const updateMenuAddonCategories = await prisma.$transaction(
      menuAddonCategoryIds.map((item) =>
        prisma.menuAddonCategory.create({
          data: { addonCategoryId: item.addonCategoryId, menuId: item.menuIds },
        })
      )
    );
    return res
      .status(200)
      .json({ updateAddonCategory, updateMenuAddonCategories });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = await prisma.addonCategory.findFirst({ where: { id } });
    if (!isValid) return res.status(404).send("Data Invalid");
    await prisma.addonCategory.update({
      where: { id },
      data: { isArchived: true },
    });
    return res.status(200).send("OK");
  }

  res.status(400).send("Invalid Method");
};
export default AddonCategory;
