"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Utensils } from "lucide-react";

import type { MenuCategory } from "@/data/menu";

const CATEGORY_IMAGES: Record<string, string> = {
  Rice: "/images/menu/rice.jpg",
  Kotthu: "/images/menu/kotthu.jpg",
  Chopsuey: "/images/menu/chopsuey.jpg",
  Noodles: "/images/menu/noodles.jpg",
  Devilled: "/images/menu/devilled.jpg",
  Omelet: "/images/menu/omelet.jpg",
  Stew: "/images/menu/stew.jpg",
  Fry: "/images/menu/fry.jpg",
  "Black Curry": "/images/menu/black-curry.jpg",
  "Rice & Curry": "/images/menu/rice-and-curry.jpg",
  Special: "/images/menu/special.jpg",
};

export default function MenuSection({ menu }: { menu: MenuCategory[] }) {
  const [active, setActive] = useState(menu[0]?.category ?? "Rice");

  const category = useMemo(
    () => menu.find((item) => item.category === active) ?? menu[0],
    [active, menu]
  );

  if (!category) return null;

  const hasSizes = category.items.some(
    (item) => item.small !== undefined || item.large !== undefined
  );
  const categoryImage = CATEGORY_IMAGES[category.category];

  return (
    <section id="menu" className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">The EATMO menu</span>
            <h2 className="display mt-4 text-4xl md:text-5xl">
              Something for everyone.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-gray-600">
            Explore our complete menu. All prices are displayed in LKR.
          </p>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {menu.map((item) => {
            const isActive = active === item.category;

            return (
              <button
                key={item.category}
                type="button"
                onClick={() => setActive(item.category)}
                aria-pressed={isActive}
                className={`shrink-0 whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#4b249f] via-[#6d3fd1] to-[#9467df] text-white shadow-lg shadow-purple-200"
                    : "bg-white text-gray-700 shadow-sm hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                {item.category}
              </button>
            );
          })}
        </div>

        <div className="soft mt-6 overflow-hidden bg-white shadow-sm">
          <div className="relative min-h-[190px] overflow-hidden text-white md:min-h-[230px]">
            {categoryImage ? (
              <Image
                src={categoryImage}
                alt={`${category.category} dishes at EATMO Cabana & Restaurant`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#4b249f] via-[#6d3fd1] to-[#9467df]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
            <div className="absolute inset-0 flex items-end p-5 md:p-8">
              <div className="flex w-full items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-100">
                    EATMO MENU
                  </p>
                  <h3 className="display mt-2 text-3xl drop-shadow md:text-5xl">
                    {category.category}
                  </h3>
                </div>
                <Utensils className="mb-1 shrink-0 text-white/80" size={28} />
              </div>
            </div>

            {hasSizes && (
              <div className="absolute bottom-6 right-7 hidden gap-2 sm:flex">
                <div className="w-[105px] text-center text-[10px] font-bold uppercase tracking-wider text-white/80">
                  Small
                </div>
                <div className="w-[105px] text-center text-[10px] font-bold uppercase tracking-wider text-white/80">
                  Large
                </div>
              </div>
            )}
          </div>

          <div className="divide-y divide-purple-900/30 bg-gradient-to-b from-[#35165c] via-[#2b124b] to-[#24103f]">
            {category.items.map((item, index) => {
              const hasPrice = item.price !== undefined;
              const hasSmall = item.small !== undefined;
              const hasLarge = item.large !== undefined;

              return (
                <div
                  key={`${category.category}-${item.name}-${index}`}
                  className="bg-transparent px-5 py-5 transition-colors hover:bg-white/[0.05] md:px-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <h4 className="font-bold text-white">{item.name}</h4>
                      {item.unit && (
                        <p className="mt-1 text-xs font-medium text-purple-200/80">
                          {item.unit}
                        </p>
                      )}
                    </div>

                    {hasPrice ? (
                      <div className="flex shrink-0 items-center sm:min-w-[220px] sm:justify-end">
                        <div className="rounded-2xl bg-white px-6 py-3 text-right shadow-sm">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                            Price
                          </span>
                          <span className="text-base font-bold text-black">
                            LKR {item.price!.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ) : hasSmall || hasLarge ? (
                      <div className="flex shrink-0 items-center gap-2 sm:min-w-[220px] sm:justify-end">
                        <div className="w-[105px] rounded-2xl bg-white px-3 py-3 text-center shadow-sm">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                            Small
                          </span>
                          <span className="mt-1 block text-sm font-bold text-black">
                            {hasSmall ? `LKR ${item.small!.toLocaleString()}` : "—"}
                          </span>
                        </div>
                        <div className="w-[105px] rounded-2xl bg-white px-3 py-3 text-center shadow-sm">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                            Large
                          </span>
                          <span className="mt-1 block text-sm font-bold text-black">
                            {hasLarge ? `LKR ${item.large!.toLocaleString()}` : "—"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-purple-200/60">
                        Price unavailable
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {category.notes && category.notes.length > 0 && (
            <div className="border-t border-purple-300/10 bg-[#2b124b] px-5 py-5 md:px-8">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-200">
                Special options
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {category.notes.map((note, index) => (
                  <div
                    key={`${category.category}-note-${index}`}
                    className="rounded-2xl border border-purple-300/10 bg-purple-950/40 px-4 py-3 text-sm font-semibold text-purple-50 shadow-sm"
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
