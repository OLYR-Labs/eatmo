import { prisma } from "@/lib/prisma";

export async function getPublicMenu() {
  const categories = await prisma.menuCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    include: { items: { where: { available: true }, orderBy: { sortOrder: "asc" } } },
  });

  return categories.map((category) => ({
    category: category.name,
    notes: category.notes,
    items: category.items.map((item) => ({
      name: item.name,
      description: item.description ?? undefined,
      price: item.price ?? undefined,
      small: item.small ?? undefined,
      large: item.large ?? undefined,
      unit: item.unit ?? undefined,
    })),
  }));
}
