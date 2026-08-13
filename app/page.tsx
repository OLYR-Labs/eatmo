"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Clock3,
  Facebook,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Utensils,
} from "lucide-react";
import { menu } from "@/data/menu";

const PHONE = "94776077189";
const DISPLAY_PHONE = "077 607 7189";
const FACEBOOK = "https://www.facebook.com/eatmo.ingiriya/";

const DIRECTIONS =
  "https://www.google.com/maps/search/?api=1&query=EATMO%20Cabana%20%26%20Restaurant%2C%20Ingiriya%2C%20Sri%20Lanka";

export default function Home() {
  const [active, setActive] = useState(
    menu[0]?.category ?? "Rice"
  );

  const category = useMemo(() => {
    return (
      menu.find((item) => item.category === active) ??
      menu[0]
    );
  }, [active]);

  if (!category) {
    return null;
  }

  const hasSizes = category.items.some(
    (item) =>
      item.small !== undefined ||
      item.large !== undefined
  );

  return (
    <main>
      {/* =========================================================
          NAVBAR
      ========================================================== */}
      <header className="relative z-50 border-b border-white/20 bg-gradient-to-r from-[#32105f] via-[#6233b5] to-[#9a68e8] text-white shadow-lg shadow-purple-900/10">
        <div className="container flex min-h-20 items-center justify-between gap-4 py-3">
          {/* LOGO + NAME */}
          <a
            href="#top"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src="/images/eatmo-logo.png"
              alt="EATMO Cabana & Restaurant"
              width={58}
              height={58}
              className="h-14 w-14 object-contain"
              priority
            />

            <div>
              <div className="text-xl font-bold tracking-tight">
                EATMO
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-100">
                Cabana & Restaurant
              </div>
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a
              href="#about"
              className="text-white/90 transition hover:text-white"
            >
              About
            </a>

            <a
              href="#menu"
              className="text-white/90 transition hover:text-white"
            >
              Menu
            </a>

            <a
              href="#gallery"
              className="text-white/90 transition hover:text-white"
            >
              Gallery
            </a>

            <a
              href="#contact"
              className="text-white/90 transition hover:text-white"
            >
              Contact
            </a>
          </nav>

          {/* NAV ACTIONS */}
          <div className="flex items-center gap-2">
            {/* CALL */}
            <a
              href={`tel:+${PHONE}`}
              className="hidden items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 sm:inline-flex"
            >
              <Phone size={16} />
              Call Now
            </a>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${PHONE}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-[#20bd5a] hover:shadow-green-900/30"
            >
              <MessageCircle
                size={16}
                className="shrink-0"
              />

              <span className="hidden sm:inline">
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================== */}
      <section
        id="top"
        className="relative overflow-hidden py-12 md:py-20"
      >
        <div className="absolute -right-32 -top-28 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />

        <div className="absolute -left-32 top-40 h-72 w-72 rounded-full bg-purple-100/60 blur-3xl" />

        <div className="container grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative">
            <span className="eyebrow">
              Ingiriya · Sri Lanka
            </span>

            <h1 className="display mt-5 text-5xl leading-[1.02] md:text-7xl">
              Good food.
              <br />

              <span className="text-[var(--purple)]">
                Good moments.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Welcome to EATMO Cabana & Restaurant — a
              place to slow down, gather around the table and
              enjoy generously prepared food.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="btn btn-primary"
                href="#menu"
              >
                Explore Menu
                <ArrowRight size={17} />
              </a>

              <a
                className="btn btn-light"
                href="#contact"
              >
                <MapPin size={17} />
                Find EATMO
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Clock3
                  size={16}
                  className="text-[var(--purple)]"
                />

                Open daily · 10:00 AM–12:00 AM
              </span>

              <span className="flex items-center gap-2">
                <Utensils
                  size={16}
                  className="text-[var(--purple)]"
                />

                Family restaurant
              </span>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#eee7ff] via-[#d9c9fa] to-[#8f68dc] p-3 shadow-2xl shadow-purple-200/40">
            <div className="flex min-h-[430px] items-end rounded-[30px] border border-white/60 bg-[radial-gradient(circle_at_60%_20%,rgba(255,255,255,.85),transparent_30%),linear-gradient(145deg,#fff,#efe8fc_48%,#c3a9ee)] p-7">
              <div className="rounded-3xl bg-white/90 p-5 shadow-xl backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[.18em] text-[var(--purple)]">
                  EATMO SPECIAL
                </p>

                <h2 className="display mt-2 text-3xl">
                  Made to share.
                </h2>

                <p className="mt-2 max-w-xs text-sm leading-6 text-gray-600">
                  From hearty rice and kottu to devilled
                  favourites and seafood specials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ABOUT
      ========================================================== */}
      <section
        id="about"
        className="py-16 md:py-24"
      >
        <div className="container grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <span className="eyebrow">
              A place to eat & unwind
            </span>

            <h2 className="display mt-4 text-4xl md:text-5xl">
              More than a meal.
            </h2>
          </div>

          <div className="soft bg-white p-7 shadow-sm md:p-10">
            <p className="text-xl leading-8 text-gray-700">
              EATMO brings together comforting Sri Lankan
              flavours, generous portions and a relaxed
              cabana-style dining experience in Ingiriya.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-[var(--purple-soft)] p-5">
                <div className="text-2xl">🍽️</div>

                <h3 className="mt-3 font-bold">
                  Freshly prepared
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Food made for the table.
                </p>
              </div>

              <div className="rounded-3xl bg-[var(--purple-soft)] p-5">
                <div className="text-2xl">🌶️</div>

                <h3 className="mt-3 font-bold">
                  Full of flavour
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Sri Lankan favourites.
                </p>
              </div>

              <div className="rounded-3xl bg-[var(--purple-soft)] p-5">
                <div className="text-2xl">👨‍👩‍👧‍👦</div>

                <h3 className="mt-3 font-bold">
                  Made to share
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Perfect for groups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MENU
      ========================================================== */}
      <section
        id="menu"
        className="bg-[#f4f0fa] py-16 md:py-24"
      >
        <div className="container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">
                The EATMO menu
              </span>

              <h2 className="display mt-4 text-4xl md:text-5xl">
                Something for everyone.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-gray-600">
              Explore our complete menu. All prices are
              displayed in LKR.
            </p>
          </div>

          {/* CATEGORY BUTTONS */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {menu.map((item) => {
              const isActive =
                active === item.category;

              return (
                <button
                  key={item.category}
                  type="button"
                  onClick={() =>
                    setActive(item.category)
                  }
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

          {/* MENU CARD */}
          <div className="soft mt-6 overflow-hidden bg-white shadow-sm">
            {/* MENU HEADER */}
            <div className="bg-gradient-to-r from-[#4b249f] via-[#6d3fd1] to-[#9467df] px-5 py-7 text-white md:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-200">
                    EATMO MENU
                  </p>

                  <h3 className="display mt-2 text-3xl md:text-4xl">
                    {category.category}
                  </h3>
                </div>

                <Utensils
                  className="mt-1 shrink-0 text-purple-200"
                  size={26}
                />
              </div>

              {/* PRICE HEADERS */}
              {hasSizes && (
                <div className="mt-6 hidden justify-end gap-2 pr-1 sm:flex">
                  <div className="w-[105px] text-center text-[10px] font-bold uppercase tracking-wider text-purple-200">
                    Small
                  </div>

                  <div className="w-[105px] text-center text-[10px] font-bold uppercase tracking-wider text-purple-200">
                    Large
                  </div>
                </div>
              )}
            </div>

            {/* MENU ITEMS */}
            <div className="divide-y divide-gray-100">
              {category.items.map((item, index) => {
                const hasPrice =
                  item.price !== undefined;

                const hasSmall =
                  item.small !== undefined;

                const hasLarge =
                  item.large !== undefined;

                return (
                  <div
                    key={`${category.category}-${item.name}-${index}`}
                    className="px-5 py-5 transition hover:bg-purple-50/50 md:px-8"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {/* FOOD NAME */}
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900">
                          {item.name}
                        </h4>

                        {item.unit && (
                          <p className="mt-1 text-xs font-medium text-gray-500">
                            {item.unit}
                          </p>
                        )}
                      </div>

                      {/* PRICE AREA */}
                      {hasPrice ? (
                        <div className="flex shrink-0 items-center sm:min-w-[220px] sm:justify-end">
                          <div className="rounded-2xl bg-purple-50 px-6 py-3 text-right">
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-500">
                              Price
                            </span>

                            <span className="text-base font-bold text-[var(--purple-dark)]">
                              LKR{" "}
                              {item.price!.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ) : hasSmall || hasLarge ? (
                        <div className="flex shrink-0 items-center gap-2 sm:min-w-[220px] sm:justify-end">
                          {/* SMALL */}
                          <div className="w-[105px] rounded-2xl bg-purple-50 px-3 py-3 text-center">
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-500">
                              Small
                            </span>

                            <span className="mt-1 block text-sm font-bold text-[var(--purple-dark)]">
                              {hasSmall
                                ? `LKR ${item.small!.toLocaleString()}`
                                : "—"}
                            </span>
                          </div>

                          {/* LARGE */}
                          <div className="w-[105px] rounded-2xl bg-purple-50 px-3 py-3 text-center">
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-500">
                              Large
                            </span>

                            <span className="mt-1 block text-sm font-bold text-[var(--purple-dark)]">
                              {hasLarge
                                ? `LKR ${item.large!.toLocaleString()}`
                                : "—"}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-2xl bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-400">
                          Price unavailable
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CATEGORY NOTES */}
            {category.notes &&
              category.notes.length > 0 && (
                <div className="border-t border-purple-100 bg-purple-50 px-5 py-5 md:px-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                    Special options
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3">
                    {category.notes.map(
                      (note, index) => (
                        <div
                          key={`${category.category}-note-${index}`}
                          className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm"
                        >
                          {note}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* =========================================================
          GALLERY
      ========================================================== */}
      <section
        id="gallery"
        className="py-16 md:py-24"
      >
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">
                Inside EATMO
              </span>

              <h2 className="display mt-4 text-4xl md:text-5xl">
                A taste before you arrive.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-gray-600">
              A glimpse of the food, atmosphere and
              moments waiting for you at EATMO.
            </p>
          </div>

          {/* =====================================================
              REAL GALLERY IMAGES
          ====================================================== */}
          <div className="mt-8 grid gap-4 md:grid-cols-12 md:grid-rows-2">
            {/* FOOD & FAVOURITES */}
            <GalleryImage
              src="/images/food-favourites.jpg"
              alt="Delicious Sri Lankan food at EATMO Cabana & Restaurant"
              label="Food & favourites"
              className="md:col-span-7 md:row-span-2"
            />

            {/* CABANA */}
            <GalleryImage
              src="/images/cabana.jpg"
              alt="EATMO Cabana & Restaurant dining area"
              label="The cabana"
              className="md:col-span-5"
            />

            {/* GOOD MOMENTS */}
            <GalleryImage
              src="/images/good-moments.jpg"
              alt="Guests enjoying a meal at EATMO Cabana & Restaurant"
              label="Good moments"
              className="md:col-span-5"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT
      ========================================================== */}
      <section
        id="contact"
        className="bg-[#17121f] py-16 text-white md:py-24"
      >
        <div className="container grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <span className="eyebrow bg-white/10 text-purple-200">
              Visit EATMO
            </span>

            <h2 className="display mt-5 text-5xl">
              Come hungry.
              <br />

              <span className="text-purple-300">
                Leave happy.
              </span>
            </h2>

            <div className="mt-8 space-y-5 text-gray-300">
              {/* LOCATION */}
              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-purple-300" />

                <div>
                  <p className="font-bold text-white">
                    Location
                  </p>

                  <p>
                    P5VH+7MH, A8, Ingiriya, Sri Lanka
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex gap-4">
                <Phone className="mt-1 shrink-0 text-purple-300" />

                <div>
                  <p className="font-bold text-white">
                    Call
                  </p>

                  <a
                    href={`tel:+${PHONE}`}
                    className="transition hover:text-white"
                  >
                    {DISPLAY_PHONE}
                  </a>
                </div>
              </div>

              {/* HOURS */}
              <div className="flex gap-4">
                <Clock3 className="mt-1 shrink-0 text-purple-300" />

                <div>
                  <p className="font-bold text-white">
                    Opening hours
                  </p>

                  <p>
                    Daily · 10:00 AM–12:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* CONTACT BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-3">
              {/* WHATSAPP */}
              <a
                href={`https://wa.me/${PHONE}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-[#20bd5a]"
              >
                <MessageCircle size={17} />
                WhatsApp
              </a>

              {/* CALL */}
              <a
                href={`tel:+${PHONE}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                <Phone size={17} />
                Call Now
              </a>

              {/* FACEBOOK */}
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                <Facebook size={17} />
                Facebook
              </a>

              {/* DIRECTIONS */}
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                <Navigation size={17} />
                Get Directions
              </a>
            </div>
          </div>

          {/* MAP */}
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-2">
            <iframe
              title="EATMO Cabana & Restaurant location"
              src="https://www.google.com/maps?q=EATMO%20Cabana%20%26%20Restaurant%2C%20Ingiriya%2C%20Sri%20Lanka&output=embed"
              className="h-[440px] w-full rounded-[26px] border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <footer className="bg-[#17121f] px-4 pb-24 text-gray-400 md:pb-8">
        <div className="container border-t border-white/10 pt-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* COPYRIGHT */}
            <p className="text-sm">
              © {new Date().getFullYear()} EATMO Cabana &
              Restaurant. All rights reserved.
            </p>

            {/* FOOTER LINKS */}
            <div className="flex flex-wrap items-center gap-5 text-sm">
              <a
                href="#menu"
                className="transition hover:text-white"
              >
                Menu
              </a>

              <a
                href={FACEBOOK}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                Facebook
              </a>

              <a
                href="#contact"
                className="transition hover:text-white"
              >
                Contact
              </a>

              {/* GET DIRECTIONS */}
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4b249f] via-[#6d3fd1] to-[#9467df] px-5 py-2.5 font-bold text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 hover:shadow-purple-900/30"
              >
                <Navigation size={15} />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================
          MOBILE ACTION BAR
      ========================================================== */}
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-white/60 bg-white/90 p-1.5 shadow-2xl backdrop-blur-xl md:hidden">
        {/* CALL */}
        <a
          href={`tel:+${PHONE}`}
          className="flex items-center gap-1.5 rounded-full px-4 py-3 text-xs font-bold text-gray-800 transition hover:bg-gray-100"
        >
          <Phone size={15} />
          Call
        </a>

        {/* WHATSAPP */}
        <a
          href={`https://wa.me/${PHONE}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#20bd5a]"
        >
          <MessageCircle size={15} />
          WhatsApp
        </a>

        {/* MAP */}
        <a
          href={DIRECTIONS}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-full px-4 py-3 text-xs font-bold text-gray-800 transition hover:bg-gray-100"
        >
          <Navigation size={15} />
          Map
        </a>
      </div>
    </main>
  );
}

/* ===============================================================
   GALLERY IMAGE
================================================================ */

function GalleryImage({
  src,
  alt,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`group relative min-h-48 overflow-hidden rounded-[28px] bg-purple-100 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />

      {/* IMAGE OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* LABEL */}
      <div className="absolute bottom-5 left-5">
        <div className="rounded-2xl bg-white/90 px-4 py-3 text-sm font-bold text-gray-900 shadow-lg backdrop-blur-md">
          {label}
        </div>
      </div>
    </div>
  );
}