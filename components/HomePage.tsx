import Image from "next/image";
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
import { createClient } from "next-sanity";

import MenuSection from "@/components/MenuSection";
import { menu as fallbackMenu, type MenuCategory } from "@/data/menu";

const PHONE = "94776077189";
const DISPLAY_PHONE = "077 607 7189";
const FACEBOOK = "https://www.facebook.com/eatmo.ingiriya/";
const DIRECTIONS =
  "https://www.google.com/maps/search/?api=1&query=EATMO%20Cabana%20%26%20Restaurant%2C%20Ingiriya%2C%20Sri%20Lanka";

const MENU_QUERY = `
  *[_type == "menuCategory"] | order(order asc) {
    title,
    order,
    items[] { name, price, small, large, unit },
    notes
  }
`;

async function getMenu(): Promise<MenuCategory[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) return fallbackMenu;

  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-30",
      useCdn: false,
    });

    const categories = await client.fetch<
      Array<{
        title: string;
        order?: number;
        items?: MenuCategory[0]["items"];
        notes?: string[];
      }>
    >(MENU_QUERY, {}, { cache: "no-store" });

    if (!categories.length) return fallbackMenu;

    return categories.map((category) => ({
      category: category.title,
      items: category.items ?? [],
      notes: category.notes,
    }));
  } catch (error) {
    console.error("Failed to load EATMO menu from Sanity:", error);
    return fallbackMenu;
  }
}

export default async function HomePage() {
  const menu = await getMenu();

  return (
    <main>
      <header className="relative z-50 border-b border-white/20 bg-gradient-to-r from-[#32105f] via-[#6233b5] to-[#9a68e8] text-white shadow-lg shadow-purple-900/10">
        <div className="container flex min-h-20 items-center justify-between gap-4 py-3">
          <a href="#top" className="flex shrink-0 items-center gap-3">
            <Image src="/images/eatmo-logo.png" alt="EATMO Cabana & Restaurant" width={58} height={58} className="h-14 w-14 object-contain" priority />
            <div>
              <div className="text-xl font-bold tracking-tight">EATMO</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-100">Cabana & Restaurant</div>
            </div>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#about" className="text-white/90 transition hover:text-white">About</a>
            <a href="#menu" className="text-white/90 transition hover:text-white">Menu</a>
            <a href="#gallery" className="text-white/90 transition hover:text-white">Gallery</a>
            <a href="#contact" className="text-white/90 transition hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={`tel:+${PHONE}`} className="hidden items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 sm:inline-flex"><Phone size={16} />Call Now</a>
            <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#20bd5a]"><MessageCircle size={16} /><span className="hidden sm:inline">WhatsApp</span></a>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden py-12 md:py-20">
        <div className="absolute -right-32 -top-28 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute -left-32 top-40 h-72 w-72 rounded-full bg-purple-100/60 blur-3xl" />
        <div className="container grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative">
            <span className="eyebrow">Ingiriya · Sri Lanka</span>
            <h1 className="display mt-5 text-5xl leading-[1.02] md:text-7xl">Good food.<br /><span className="text-[var(--purple)]">Good moments.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">Welcome to EATMO Cabana & Restaurant — a place to slow down, gather around the table and enjoy generously prepared food.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#menu">Explore Menu <ArrowRight size={17} /></a>
              <a className="btn btn-light" href="#contact"><MapPin size={17} /> Find EATMO</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-gray-600">
              <span className="flex items-center gap-2"><Clock3 size={16} className="text-[var(--purple)]" />Open daily · 10:00 AM–12:00 AM</span>
              <span className="flex items-center gap-2"><Utensils size={16} className="text-[var(--purple)]" />Family restaurant</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#eee7ff] via-[#d9c9fa] to-[#8f68dc] p-3 shadow-2xl shadow-purple-200/40">
            <div className="relative min-h-[430px] overflow-hidden rounded-[30px] border border-white/60">
              <Image src="/images/cabana.jpg" alt="EATMO Cabana" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 rounded-3xl bg-white/90 p-5 shadow-xl backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[.18em] text-[var(--purple)]">EATMO SPECIAL</p>
                <h2 className="display mt-2 text-3xl">Made to share.</h2>
                <p className="mt-2 max-w-xs text-sm leading-6 text-gray-600">From hearty rice and kottu to devilled favourites and seafood specials.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24">
        <div className="container grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div><span className="eyebrow">A place to eat & unwind</span><h2 className="display mt-4 text-4xl md:text-5xl">More than a meal.</h2></div>
          <div className="soft bg-white p-7 shadow-sm md:p-10">
            <p className="text-xl leading-8 text-gray-700">EATMO brings together comforting Sri Lankan flavours, generous portions and a relaxed cabana-style dining experience in Ingiriya.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-[var(--purple-soft)] p-5"><div className="text-2xl">🍽️</div><h3 className="mt-3 font-bold">Freshly prepared</h3><p className="mt-1 text-sm text-gray-600">Food made for the table.</p></div>
              <div className="rounded-3xl bg-[var(--purple-soft)] p-5"><div className="text-2xl">🌶️</div><h3 className="mt-3 font-bold">Full of flavour</h3><p className="mt-1 text-sm text-gray-600">Sri Lankan favourites.</p></div>
              <div className="rounded-3xl bg-[var(--purple-soft)] p-5"><div className="text-2xl">👨‍👩‍👧‍👦</div><h3 className="mt-3 font-bold">Made to share</h3><p className="mt-1 text-sm text-gray-600">Perfect for groups.</p></div>
            </div>
          </div>
        </div>
      </section>

      <MenuSection menu={menu} />

      <section id="gallery" className="py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><span className="eyebrow">Inside EATMO</span><h2 className="display mt-4 text-4xl md:text-5xl">A taste before you arrive.</h2></div>
            <p className="max-w-sm text-sm leading-6 text-gray-600">A glimpse of the food, cabana and good moments waiting at EATMO.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-12 md:grid-rows-2">
            <GalleryImage src="/images/food-favourites.jpg" label="Food & favourites" className="md:col-span-7 md:row-span-2" />
            <GalleryImage src="/images/cabana.jpg" label="The cabana" className="md:col-span-5" />
            <GalleryImage src="/images/good-moments.jpg" label="Good moments" className="md:col-span-5" />
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#17121f] py-16 text-white md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <span className="eyebrow bg-white/10 text-purple-200">Visit EATMO</span>
            <h2 className="display mt-5 text-5xl">Come hungry.<br /><span className="text-purple-300">Leave happy.</span></h2>
            <div className="mt-8 space-y-5 text-gray-300">
              <div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-purple-300" /><div><p className="font-bold text-white">Location</p><p>P5VH+7MH, A8, Ingiriya, Sri Lanka</p></div></div>
              <div className="flex gap-4"><Phone className="mt-1 shrink-0 text-purple-300" /><div><p className="font-bold text-white">Call</p><a href={`tel:+${PHONE}`} className="transition hover:text-white">{DISPLAY_PHONE}</a></div></div>
              <div className="flex gap-4"><Clock3 className="mt-1 shrink-0 text-purple-300" /><div><p className="font-bold text-white">Opening hours</p><p>Daily · 10:00 AM–12:00 AM</p></div></div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#20bd5a]"><MessageCircle size={17} />WhatsApp</a>
              <a href={`tel:+${PHONE}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"><Phone size={17} />Call Now</a>
              <a href={FACEBOOK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"><Facebook size={17} />Facebook</a>
              <a href={DIRECTIONS} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"><Navigation size={17} />Get Directions</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-2">
            <iframe title="EATMO Cabana & Restaurant location" src="https://www.google.com/maps?q=EATMO%20Cabana%20%26%20Restaurant%2C%20Ingiriya%2C%20Sri%20Lanka&output=embed" className="h-[440px] w-full rounded-[26px] border-0" loading="lazy" allowFullScreen />
          </div>
        </div>
      </section>

      <footer className="bg-[#17121f] px-4 pb-24 text-gray-400 md:pb-8">
        <div className="container border-t border-white/10 pt-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm">© {new Date().getFullYear()} EATMO Cabana & Restaurant. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-5 text-sm">
              <a href="#menu" className="transition hover:text-white">Menu</a>
              <a href={FACEBOOK} target="_blank" rel="noreferrer" className="transition hover:text-white">Facebook</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
              <a href={DIRECTIONS} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4b249f] via-[#6d3fd1] to-[#9467df] px-5 py-2.5 font-bold text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5"><Navigation size={15} />Get Directions</a>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-white/60 bg-white/90 p-1.5 shadow-2xl backdrop-blur-xl md:hidden">
        <a href={`tel:+${PHONE}`} className="flex items-center gap-1.5 rounded-full px-4 py-3 text-xs font-bold text-gray-800 transition hover:bg-gray-100"><Phone size={15} />Call</a>
        <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#20bd5a]"><MessageCircle size={15} />WhatsApp</a>
        <a href={DIRECTIONS} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full px-4 py-3 text-xs font-bold text-gray-800 transition hover:bg-gray-100"><Navigation size={15} />Map</a>
      </div>
    </main>
  );
}

function GalleryImage({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  return (
    <div className={`soft relative min-h-64 overflow-hidden bg-purple-100 ${className}`}>
      <Image src={src} alt={label} fill className="object-cover transition duration-500 hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-4 py-3 text-sm font-bold text-gray-900 shadow-lg backdrop-blur-md">{label}</div>
    </div>
  );
}
