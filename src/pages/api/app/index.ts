// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import { getImageUrl, imageUrl } from "@/utils/fileUpload";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const app = async (req: NextApiRequest, res: NextApiResponse) => {
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
  } else {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(404).send("Unauthorized");
    const user = session.user;
    const name = user?.name as string;
    const email = user?.email as string;
    const db = await prisma.user.findUnique({ where: { email } });
    console.log(db);
    if (!db) {
      const newCompanyName = "Default Company";
      const newCompanyStreet = "Default Street";
      const newCompanyTwonship = "Default TownShip";
      const newCompanyCity = "Default City";
      // 1. create default company
      const company = await prisma.company.create({
        data: {
          name: newCompanyName,
          street: newCompanyStreet,
          townShip: newCompanyTwonship,
          city: newCompanyCity,
        },
      });
      // 2. create default user
      await prisma.user.create({
        data: { email, name, companyId: company.id },
      });

      // 3. create default location
      const newLocationName = "Default Locaiont";
      const newLocationStreet = "Default  Street";
      const newLocationTownShip = "Default  TownShip";
      const newLocationCity = "Default  City";
      const location = await prisma.location.create({
        data: {
          name: newLocationName,
          street: newLocationStreet,
          townShip: newLocationTownShip,
          city: newLocationCity,
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
          qrcodeUrl: "",
        },
      });

      const tableId = table.id;
      imageUrl(tableId);
      const qrcodeUrl = getImageUrl(tableId);
      await prisma.table.update({
        data: { qrcodeUrl },
        where: { id: tableId },
      });
      return res.status(200).json({
        company,
        location,
        menuCategory,
        menu,
        addonCategory,
        addon,
        orders: [],
      });
    } else {
      const companyId = db.companyId;
      const company = await prisma.company.findFirst({
        where: { id: companyId },
      });

      const locations = await prisma.location.findMany({
        where: { companyId },
      });
      const locationId = locations.map((item) => item.id);
      const tables = await prisma.table.findMany({
        where: { locationId: { in: locationId }, isArchived: false },
      });
      const tableIds = tables.map((item) => item.id);
      const menuCategories = await prisma.menucategory.findMany({
        where: { companyId, isArchived: false },
      });
      const menuCategoryIds = menuCategories.map((item) => item.id);
      const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
        where: { menuCategoryId: { in: menuCategoryIds }, isArchived: false },
      });
      const disableLocationMenuCategory =
        await prisma.disableLocationMenuCategory.findMany({
          where: { menuCategoryId: { in: menuCategoryIds } },
        });
      const menuIds = menuCategoryMenu.map((item) => item.menuId);
      const disableLocationMenu = await prisma.disableLocationMenu.findMany({
        where: { menuId: { in: menuIds } },
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
      const orders = await prisma.order.findMany({
        where: { tableId: { in: tableIds } },
      });
      return res.status(200).json({
        locations,
        tables,
        menuCategories,
        menus,
        addonCategories,
        menuAddonCategory,
        addons,
        orders,
        company,
        menuCategoryMenu,
        disableLocationMenuCategory,
        disableLocationMenu,
      });
    }
  }
};
export default app;
