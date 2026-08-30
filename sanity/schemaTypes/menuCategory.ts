import { defineField, defineType } from "sanity";

export default defineType({
  name: "menuCategory",
  title: "Menu Category",
  type: "document",
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Category name",
      type: "string",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: "items",
      title: "Menu items",
      type: "array",
      of: [
        {
          type: "object",
          name: "menuItem",
          title: "Menu item",
          fields: [
            defineField({
              name: "name",
              title: "Item name",
              type: "string",
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: "price",
              title: "Single price (LKR)",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: "small",
              title: "Small price (LKR)",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: "large",
              title: "Large price (LKR)",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: "unit",
              title: "Unit / serving size",
              type: "string",
              description: "Optional text such as 250g / 500g.",
            }),
          ],
          preview: {
            select: {
              title: "name",
              price: "price",
              small: "small",
              large: "large",
            },
            prepare({ title, price, small, large }) {
              const prices = price
                ? `LKR ${price}`
                : [small, large]
                    .filter((value) => value !== undefined)
                    .map((value) => `LKR ${value}`)
                    .join(" / ");

              return {
                title,
                subtitle: prices || "Price not set",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "notes",
      title: "Category notes",
      type: "array",
      of: [{ type: "string" }],
      description: "Optional special options or set-menu notes.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      order: "order",
      itemCount: "items",
    },
    prepare({ title, order, itemCount }) {
      return {
        title,
        subtitle: `${itemCount?.length ?? 0} items · Order ${order ?? 0}`,
      };
    },
  },
});
