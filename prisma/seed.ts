import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { menu } from "../data/menu";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  for (const [categoryIndex, category] of menu.entries()) {
    const existingCategory = await prisma.menuCategory.findFirst({
      where: { name: category.category },
      select: { id: true },
    });

    const savedCategory = existingCategory
      ? await prisma.menuCategory.update({
          where: { id: existingCategory.id },
          data: {
            notes: category.notes ?? [],
            sortOrder: categoryIndex,
            active: true,
          },
        })
      : await prisma.menuCategory.create({
          data: {
            name: category.category,
            notes: category.notes ?? [],
            sortOrder: categoryIndex,
            active: true,
          },
        });

    for (const [itemIndex, item] of category.items.entries()) {
      const existing = await prisma.menuItem.findFirst({
        where: {
          categoryId: savedCategory.id,
          name: item.name,
        },
        select: { id: true },
      });

      const data = {
        name: item.name,
        price: item.price ?? null,
        small: item.small ?? null,
        large: item.large ?? null,
        unit: item.unit ?? null,
        sortOrder: itemIndex,
        available: true,
      };

      if (existing) {
        await prisma.menuItem.update({
          where: { id: existing.id },
          data,
        });
      } else {
        await prisma.menuItem.create({
          data: {
            ...data,
            categoryId: savedCategory.id,
          },
        });
      }
    }
  }

  console.log(`Seeded ${menu.length} EATMO menu categories.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
