import { getCliClient } from "sanity/cli";

import { menu } from "../data/menu";

const client = getCliClient();

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function seedMenu() {
  const documents = menu.map((category, index) => ({
    _id: `menu-category-${slugify(category.category)}`,
    _type: "menuCategory",
    title: category.category,
    order: index + 1,
    items: category.items.map((item) => ({
      _type: "menuItem",
      _key: slugify(item.name),
      name: item.name,
      ...(item.price !== undefined ? { price: item.price } : {}),
      ...(item.small !== undefined ? { small: item.small } : {}),
      ...(item.large !== undefined ? { large: item.large } : {}),
      ...(item.unit ? { unit: item.unit } : {}),
    })),
    ...(category.notes?.length ? { notes: category.notes } : {}),
  }));

  console.log(`Seeding ${documents.length} menu categories...`);

  const transaction = client.transaction();

  for (const document of documents) {
    transaction.createOrReplace(document);
  }

  await transaction.commit();

  console.log("EATMO menu seeded successfully.");
}

seedMenu().catch((error) => {
  console.error("Failed to seed EATMO menu:", error);
  process.exit(1);
});
