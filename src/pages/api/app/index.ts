// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const app = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(404).send("Unauthorized");

  const user = session.user;
  const name = user?.name as string;
  const email = user?.email as string;
  // const valid = name && email;
  // if (!valid) return res.status(405).send("Missing Required");
  const db = await prisma.user.findUnique({ where: { email } });
  if (!db) {
    const newCompanyName = "Default Company";
    const newCompanyAddress = "Default Company Address";
    // 1. create default company
    const company = await prisma.company.create({
      data: { name: newCompanyName, address: newCompanyAddress },
    });
    // 2. create default user
    await prisma.user.create({ data: { email, name, companyId: company.id } });

    // 3. create default location
    const newLocationName = "Default Locaiotn";
    const newLocationAddress = "Default Location Address";
    const location = await prisma.location.create({
      data: {
        name: newLocationName,
        address: newLocationAddress,
        companyId: company.id,
      },
    });

    // 4. create default Menu Category
    const newMenuCategoryName = "Default Menu Category";
    const menuCategory = await prisma.menucategory.create({
      data: {
        name: newMenuCategoryName,
        companyId: company.id,
      },
    });

    // 5. create default Menu
    const newMenuName = "Default Menu";
    const menu = await prisma.menu.create({
      data: {
        name: newMenuName,
        price: 1000,
      },
    });

    // 6. create default Rows in MenuCategory Menu
    const menuCategoryMenu = await prisma.menuCategoryMenu.create({
      data: {
        menuCategoryId: menuCategory.id,
        menuId: menu.id,
      },
    });
    // 7. create default Addon Category
    const newAddonCategoryName = "Default Addon Category";
    const addonCategory = await prisma.addonCategory.create({
      data: {
        name: newAddonCategoryName,
      },
    });
    // 8. create default Rows in  Menu Addon Category
    const menuAddonCategory = await prisma.menuAddonCategory.create({
      data: {
        menuId: menu.id,
        addonCategoryId: addonCategory.id,
      },
    });
    // 9. create default Addon
    const newAddonNameOne = "Default Addon";
    const newAddonNameTwo = "Default Addon";
    const newAddonNameThree = "Default Addon";

    const newAddons = [
      { name: newAddonNameOne, addonCategoryId: addonCategory.id },
      { name: newAddonNameTwo, addonCategoryId: addonCategory.id },
      { name: newAddonNameThree, addonCategoryId: addonCategory.id },
    ];
    const addon = await prisma.$transaction(
      newAddons.map((addon) => prisma.addon.create({ data: addon }))
    );

    // 10. create default Table
    const newTable = "Default Table";
    const table = await prisma.table.create({
      data: {
        name: newTable,
        locationId: location.id,
      },
    });
    return res
      .status(200)
      .json({ company, location, menuCategory, menu, addonCategory, addon });
  } else {
    const companyId = db.companyId;
    const locations = await prisma.location.findMany({ where: { companyId } });
    const locationId = locations.map((item) => item.id);
    const tables = await prisma.table.findMany({
      where: { locationId: { in: locationId } },
    });
    const menuCategories = await prisma.menucategory.findMany({
      where: { companyId },
    });
    const menuCategoryIds = menuCategories.map((item) => item.id);
    const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategoryIds } },
    });
    const menuIds = menuCategoryMenu.map((item) => item.menuId);
    const menus = await prisma.menu.findMany({
      where: { id: { in: menuIds } },
    });
    const menuAddonCategory = await prisma.menuAddonCategory.findMany({
      where: { menuId: { in: menuIds } },
    });
    const addonCategoryIds = menuAddonCategory.map(
      (item) => item.addonCategoryId
    );
    const addonCategories = await prisma.addonCategory.findMany({
      where: { id: { in: addonCategoryIds } },
    });
    const addons = await prisma.addon.findMany({
      where: { addonCategoryId: { in: addonCategoryIds } },
    });
    return res
      .status(200)
      .json({
        locations,
        tables,
        menuCategories,
        menus,
        addonCategories,
        addons,
      });
  }
};
export default app;
