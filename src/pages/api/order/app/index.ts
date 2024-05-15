// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

const app = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    const { tableId } = req.query;
    const isOrder = tableId;

    if (isOrder) {
      const tableDatas = await prisma.table.findFirst({
        where: { id: Number(tableId) },
      });
      const location = await prisma.location.findFirst({
        where: { id: tableDatas.locationId },
      });
      const companyId = location.companyId;
      const company = await prisma.company.findFirst({
        where: { id: companyId },
      });
      const locations = await prisma.location.findMany({
        where: { companyId: companyId },
      });
      const locationId = locations.map((item) => item.id);
      const tables = await prisma.table.findMany({
        where: { locationId: { in: locationId }, isArchived: false },
      });
      let menuCategories = await prisma.menucategory.findMany({
        where: { companyId: Number(companyId), isArchived: false },
      });
      const menuCategoryIds = menuCategories.map((item) => item.id);
      const disableLocationMenuCategoryIds = (
        await prisma.disableLocationMenuCategory.findMany({
          where: {
            menuCategoryId: { in: menuCategoryIds },
            locationId: location.id,
          },
        })
      ).map((item) => item.menuCategoryId);
      menuCategories = menuCategories.filter(
        (item) => !disableLocationMenuCategoryIds.includes(item.id)
      );
      const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
        where: { menuCategoryId: { in: menuCategoryIds }, isArchived: false },
      });

      const menuIds = menuCategoryMenu.map((item) => item.menuId);
      const disableLocationMenu = await prisma.disableLocationMenu.findMany({
        where: { id: { in: menuIds } },
      });
      const menus = await prisma.menu.findMany({
        where: { id: { in: menuIds }, isArchived: false },
      });
      const menuAddonCategory = await prisma.menuAddonCategory.findMany({
        where: { menuId: { in: menuIds }, isArchived: false },
      });
      const addonCategoryIds = menuAddonCategory.map(
        (item) => item.addonCategoryId
      );
      const addonCategories = await prisma.addonCategory.findMany({
        where: { id: { in: addonCategoryIds }, isArchived: false },
      });
      const addons = await prisma.addon.findMany({
        where: { addonCategoryId: { in: addonCategoryIds }, isArchived: false },
      });
      const tableIds = (
        await prisma.table.findMany({ where: { locationId: location.id } })
      ).map((item) => item.id);
      const orders = await prisma.order.findMany({
        where: { tableId: { in: tableIds } },
      });
      return res.status(200).json({
        locations: [],
        tables,
        menuCategories,
        menus,
        addonCategories,
        menuAddonCategory,
        addons,
        menuCategoryMenu,
        orders,
        company,
        disableLocationMenuCategory: [],
        disableLocationMenu: [],
      });
    }
  }
  res.status(405).send("Method not allowed.");
};
export default app;
