// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const menuCategory = async (req: NextApiRequest, res: NextApiResponse) => {
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
  } else if (method === "PUT") {
    const { id, name, locationId, isAvalible } = req.body;
    const isValid = id && name;
    if (!isValid) return res.status(405).send("Missing Required datas");
    const menuCategory = await prisma.menucategory.findFirst({ where: { id } });
    if (!menuCategory) return res.status(404).send("Data not found");
    const updateMenuCategory = await prisma.menucategory.update({
      data: { name },
      where: { id },
    });
    if (locationId && isAvalible === false) {
      const exit = await prisma.disableLocationMenuCategory.findFirst({
        where: { menuCategoryId: id, locationId },
      });
      if (exit) {
        return res
          .status(200)
          .json({ updateMenuCategory, disableLocationMenuCategory: exit });
      }
      const disableLocationMenuCategory =
        await prisma.disableLocationMenuCategory.create({
          data: { menuCategoryId: id, locationId },
        });
      return res
        .status(200)
        .json({ updateMenuCategory, disableLocationMenuCategory });
    } else if (locationId && isAvalible === true) {
      const exit = await prisma.disableLocationMenuCategory.findFirst({
        where: { menuCategoryId: id, locationId },
      });
      if (exit) {
        const disableLocationMenuCategory =
          await prisma.disableLocationMenuCategory.delete({
            where: { id: exit.id },
          });
        return res
          .status(200)
          .json({ updateMenuCategory, disableLocationMenuCategory });
      }
      return res.status(200).json({ updateMenuCategory });
    } else {
      return res.status(200).json({ updateMenuCategory });
    }
  } else if (method === "DELETE") {
    const menuCategoryId = Number(req.query.id);
    const isValid = await prisma.menucategory.findFirst({
      where: { id: menuCategoryId },
    });
    if (!isValid) return res.status(404).send("Data not found");
    const menuIds = (
      await prisma.menuCategoryMenu.findMany({
        where: { menuCategoryId, isArchived: false },
      })
    ).map((item) => item.menuId);

    const menuIdPromise = menuIds.map(async (menuId) => {
      const menuIdInitial = { menuId, count: 1 };
      const count = await prisma.menuCategoryMenu.count({
        where: { menuId, isArchived: false },
      });

      menuIdInitial.count = count;
      return menuIdInitial;
    });
    const menuIdToArchive = (await Promise.all(menuIdPromise))
      .filter((item) => item.count === 1)
      .map((item) => item.menuId);

    const addonCategoryIds = (
      await prisma.menuAddonCategory.findMany({
        where: { menuId: { in: menuIdToArchive }, isArchived: false },
      })
    ).map((item) => item.addonCategoryId);

    const addonCategoryIdPromise = addonCategoryIds.map(
      async (addonCategoryId) => {
        const addonCategoryInitial = { addonCategoryId, count: 1 };
        const count = await prisma.menuAddonCategory.count({
          where: { addonCategoryId, isArchived: false },
        });
        addonCategoryInitial.count = count;
        return addonCategoryInitial;
      }
    );
    const addonCategoryIdToArchive = (await Promise.all(addonCategoryIdPromise))
      .filter((item) => item.count === 1)
      .map((item) => item.addonCategoryId);

    for (const menuId of menuIdToArchive) {
      await prisma.menu.updateMany({
        data: { isArchived: true },
        where: { id: menuId },
      });
      await prisma.menuAddonCategory.updateMany({
        data: { isArchived: true },
        where: { menuId },
      });
    }
    for (const addonCategoryId of addonCategoryIdToArchive) {
      await prisma.addonCategory.updateMany({
        data: { isArchived: true },
        where: { id: addonCategoryId },
      });
      await prisma.addon.updateMany({
        data: { isArchived: true },
        where: { addonCategoryId },
      });
    }

    for (const menuId of menuIds) {
      await prisma.menuCategoryMenu.updateMany({
        data: { isArchived: true },
        where: { menuId, menuCategoryId },
      });
      await prisma.menucategory.updateMany({
        data: { isArchived: true },
        where: { id: menuCategoryId },
      });
    }

    // await prisma.menuCategoryMenu.updateMany({
    //   where: { menuCategoryId: id },
    //   data: { isArchived: true },
    // });
    // await prisma.menucategory.update({
    //   data: { isArchived: true },
    //   where: { id },
    // });
    return res.status(200).send("OK");
  }
  res.status(400).send("Invalid Method");
};
export default menuCategory;
