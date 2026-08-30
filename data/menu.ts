export type MenuItem = {
  name: string;
  price?: number;
  small?: number;
  large?: number;
  unit?: string;
};

export type MenuCategory = {
  category: string;
  items: MenuItem[];
  notes?: string[];
};

export const menu: MenuCategory[] = [
  {
    category: "Rice",
    items: [
      { name: "Chicken Rice", small: 800, large: 1200 },
      { name: "Egg Rice", small: 550, large: 850 },
      { name: "Vegetable Rice", small: 450, large: 750 },
      { name: "Sea Food Rice", small: 1200, large: 1700 },
      { name: "Prawn Rice", small: 1100, large: 1600 },
      { name: "Mixed Rice", small: 950, large: 1600 },
      { name: "Nasi Goreng (Mix)", small: 1200, large: 1800 },
      { name: "Nasi Goreng (Chicken)", small: 1000, large: 1600 },
    ],
    notes: ["Set Menu — LKR 600", "Eatmo Special (4 Person) — LKR 3,000"],
  },
  {
    category: "Kotthu",
    items: [
      { name: "Vegetable Kotthu", small: 450, large: 700 },
      { name: "Chicken Kotthu", small: 900, large: 1300 },
      { name: "Egg Kotthu", small: 550, large: 800 },
      { name: "Prawn Kotthu", small: 1000, large: 1500 },
      { name: "Cheese Kotthu", small: 1200, large: 1700 },
      { name: "Dolphin Kotthu" },
    ],
    notes: ["Eatmo Special (4 Person) — LKR 2,500"],
  },
  {
    category: "Chopsuey",
    items: [
      { name: "Vegetable Chopsuey Rice", small: 800, large: 1000 },
      { name: "Chiken Chopsuey Rice", small: 1200, large: 1800 },
      { name: "Prawn Chopsuey", small: 1300, large: 1600 },
      { name: "Fish Chopsuey", small: 1400, large: 1700 },
      { name: "Pork Chopsuey", small: 1400, large: 1800 },
      { name: "Beef Chopsuey", small: 1500, large: 1900 },
    ],
  },
  {
    category: "Noodles",
    items: [
      { name: "Chicken Noodles", small: 950, large: 1350 },
      { name: "Sea Food Noodles", small: 1000, large: 1400 },
      { name: "Mixed Noodles", small: 1000, large: 1600 },
      { name: "Vegetable Noodles", small: 850, large: 1100 },
      { name: "Egg Noodles", small: 900, large: 1250 },
    ],
  },
  {
    category: "Devilled",
    items: [
      { name: "Sausage Devilled", small: 950, large: 1800 },
      { name: "Chicken Devilled", small: 1200, large: 2300 },
      { name: "Fish Devilled", small: 1400, large: 2700 },
      { name: "Pork Devilled", small: 1700, large: 3300 },
      { name: "Beef Devilled", small: 1800, large: 3500 },
      { name: "Prawn Devilled", small: 1650, large: 3200 },
    ],
  },
  {
    category: "Omelet",
    items: [
      { name: "Sri Lankan Omelet", price: 300 },
      { name: "Chicken Omelet", price: 850 },
      { name: "Cheese Omelet", price: 1100 },
    ],
  },
  {
    category: "Stew",
    items: [
      { name: "Chicken Stew", small: 1550, large: 3000, unit: "250g / 500g" },
      { name: "Pork Stew", small: 1700, large: 3400, unit: "250g / 500g" },
      { name: "Beef Stew", small: 1850, large: 3600, unit: "250g / 500g" },
      { name: "Fish Stew", small: 1650, large: 3200, unit: "250g / 500g" },
    ],
  },
  {
    category: "Fry",
    items: [
      { name: "Fried Chicken", small: 1300, large: 2500, unit: "250g / 500g" },
      { name: "Fried Beef", small: 1900, large: 3700, unit: "250g / 500g" },
      { name: "Fried Pork", small: 1800, large: 3500, unit: "250g / 500g" },
      { name: "Fish Fry", small: 1500, large: 2900, unit: "250g / 500g" },
      { name: "Fried Sausage", small: 1050, large: 2000, unit: "250g / 500g" },
      { name: "Fried Prawns", small: 1750, large: 3400, unit: "250g / 500g" },
    ],
  },
  {
    category: "Black Curry",
    items: [
      { name: "Chicken Black Curry", small: 1400, large: 2700, unit: "250g / 500g" },
      { name: "Fish Black Curry", small: 1600, large: 3100, unit: "250g / 500g" },
      { name: "Beef Black Curry", small: 2000, large: 3900, unit: "250g / 500g" },
      { name: "Pork Black Curry", small: 1900, large: 3700, unit: "250g / 500g" },
      { name: "Mutton", small: 2300, large: 4500, unit: "250g / 500g" },
    ],
  },
  {
    category: "Rice & Curry",
    items: [],
    notes: ["Menu items and pricing to be added by EATMO."],
  },
  {
    category: "Special",
    items: [{ name: "Hot Batter Cuttlefish", price: 2000, unit: "250g" }],
  },
];
