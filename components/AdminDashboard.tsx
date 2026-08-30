"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type Item = { id: string; categoryId: string; name: string; description: string | null; price: number | null; small: number | null; large: number | null; unit: string | null; sortOrder: number; available: boolean };
type Category = { id: string; name: string; notes: string[]; sortOrder: number; active: boolean; items: Item[] };
const num = (v: string) => v === "" ? null : Number(v);

export default function AdminDashboard({ userName }: { userName: string }) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newItems, setNewItems] = useState<Record<string, string>>({});

  async function load() {
    const r = await fetch("/api/admin/menu", { cache: "no-store" });
    if (!r.ok) { setError("Unable to load the menu."); setLoading(false); return; }
    setCategories(await r.json()); setLoading(false);
  }
  useEffect(() => { void load(); }, []);

  async function api(method: string, body: unknown) {
    const r = await fetch("/api/admin/menu", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.error || "Request failed");
    return data;
  }

  async function addCategory(e: FormEvent) {
    e.preventDefault();
    const name = newCategory.trim();
    if (!name) return;
    setSaving("new-category"); setError("");
    try {
      const category = await api("POST", { type: "category", name });
      setCategories(current => [...current, { ...category, items: [] }]);
      setNewCategory("");
      showSaved("new-category");
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to add category"); }
    finally { setSaving(null); }
  }

  async function addItem(e: FormEvent, categoryId: string) {
    e.preventDefault();
    const name = (newItems[categoryId] ?? "").trim();
    if (!name) return;
    setSaving(`add-${categoryId}`); setError("");
    try {
      const item = await api("POST", { type: "item", categoryId, name });
      setCategories(current => current.map(category => category.id === categoryId ? { ...category, items: [...category.items, item] } : category));
      setNewItems(current => ({ ...current, [categoryId]: "" }));
      showSaved(`add-${categoryId}`);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to add item"); }
    finally { setSaving(null); }
  }

  function showSaved(id: string) {
    setSaved(id);
    window.setTimeout(() => setSaved(current => current === id ? null : current), 1400);
  }

  async function save(type: "category" | "item", value: Category | Item) {
    setSaving(value.id); setError("");
    try {
      const updated = await api("PATCH", { type, ...value });
      setCategories(current => current.map(category => {
        if (type === "category" && category.id === value.id) return { ...category, ...updated };
        if (type === "item") return { ...category, items: category.items.map(item => item.id === value.id ? { ...item, ...updated } : item) };
        return category;
      }));
      showSaved(value.id);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to save"); }
    finally { setSaving(null); }
  }

  async function remove(type: "category" | "item", id: string) {
    if (!window.confirm(type === "category" ? "Delete this category and all its items?" : "Delete this menu item?")) return;
    setSaving(`delete-${id}`); setError("");
    try {
      await api("DELETE", { type, id });
      setCategories(current => type === "category" ? current.filter(category => category.id !== id) : current.map(category => ({ ...category, items: category.items.filter(item => item.id !== id) })));
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to delete"); }
    finally { setSaving(null); }
  }

  async function signOut() { await authClient.signOut(); router.replace("/login"); router.refresh(); }
  const updateCategory = (id: string, patch: Partial<Category>) => setCategories(c => c.map(x => x.id === id ? { ...x, ...patch } : x));
  const updateItem = (cid: string, iid: string, patch: Partial<Item>) => setCategories(c => c.map(x => x.id !== cid ? x : { ...x, items: x.items.map(i => i.id === iid ? { ...i, ...patch } : i) }));

  if (loading) return <div className="min-h-screen bg-[#f7f4fb] p-8 text-gray-600">Loading menu…</div>;
  return <main className="min-h-screen bg-[#f7f4fb] text-gray-900"><header className="sticky top-0 z-20 border-b border-purple-100 bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-purple-600">EATMO</p><h1 className="text-xl font-bold">Owner Dashboard</h1></div><div className="flex items-center gap-3"><span className="hidden text-sm text-gray-500 sm:inline">Hi, {userName}</span><button onClick={signOut} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold"><LogOut size={16} />Sign out</button></div></div></header>
  <div className="mx-auto max-w-7xl space-y-6 px-5 py-8 md:px-8">{error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}<section className="rounded-3xl bg-gradient-to-r from-[#4b249f] via-[#6d3fd1] to-[#9467df] p-6 text-white shadow-lg shadow-purple-200"><p className="text-xs font-bold uppercase tracking-[.2em] text-purple-200">Menu control</p><h2 className="mt-2 text-3xl font-bold">Update EATMO without touching code.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-purple-100">Change prices, add dishes, hide unavailable items, or create new categories. Changes are saved directly to the restaurant database.</p></section>
  <form onSubmit={addCategory} className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-sm sm:flex-row"><input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="New category name" className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500" /><button type="submit" disabled={saving === "new-category"} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5f31b4] px-5 py-3 font-bold text-white disabled:opacity-50">{saved === "new-category" ? <><Check size={18} />Added</> : <><Plus size={18} />Add category</>}</button></form>
  <div className="space-y-6">{categories.map(category => <section key={category.id} className="overflow-hidden rounded-3xl bg-white shadow-sm"><div className="border-b border-gray-100 bg-gray-50 p-5"><div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end"><label className="text-xs font-bold uppercase tracking-wider text-gray-500">Category name<input value={category.name} onChange={e => updateCategory(category.id, { name: e.target.value })} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-lg font-bold outline-none focus:border-purple-500" /></label><label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold"><input type="checkbox" checked={category.active} onChange={e => updateCategory(category.id, { active: e.target.checked })} />Visible</label><div className="flex gap-2"><button type="button" onClick={() => save("category", category)} disabled={saving === category.id} className="inline-flex items-center gap-2 rounded-xl bg-[#5f31b4] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">{saved === category.id ? <><Check size={16} />Saved</> : <><Save size={16} />Save</>}</button><button type="button" onClick={() => remove("category", category.id)} disabled={saving === `delete-${category.id}`} className="rounded-xl border border-red-200 p-3 text-red-600 disabled:opacity-50"><Trash2 size={16} /></button></div></div></div><div className="divide-y divide-gray-100">{category.items.map(item => <div key={item.id} className="p-5"><div className="grid gap-3 md:grid-cols-12"><input value={item.name} onChange={e => updateItem(category.id, item.id, { name: e.target.value })} className="rounded-xl border border-gray-200 px-3 py-2.5 font-semibold md:col-span-3" placeholder="Item name" /><input value={item.description ?? ""} onChange={e => updateItem(category.id, item.id, { description: e.target.value })} className="rounded-xl border border-gray-200 px-3 py-2.5 md:col-span-3" placeholder="Description" /><input value={item.price ?? ""} onChange={e => updateItem(category.id, item.id, { price: num(e.target.value) })} type="number" className="rounded-xl border border-gray-200 px-3 py-2.5" placeholder="Price" /><input value={item.small ?? ""} onChange={e => updateItem(category.id, item.id, { small: num(e.target.value) })} type="number" className="rounded-xl border border-gray-200 px-3 py-2.5" placeholder="Small" /><input value={item.large ?? ""} onChange={e => updateItem(category.id, item.id, { large: num(e.target.value) })} type="number" className="rounded-xl border border-gray-200 px-3 py-2.5" placeholder="Large" /><input value={item.unit ?? ""} onChange={e => updateItem(category.id, item.id, { unit: e.target.value })} className="rounded-xl border border-gray-200 px-3 py-2.5" placeholder="Unit" /><label className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold"><input type="checkbox" checked={item.available} onChange={e => updateItem(category.id, item.id, { available: e.target.checked })} />Available</label><div className="flex gap-2 md:col-span-2"><button type="button" onClick={() => save("item", item)} disabled={saving === item.id} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#5f31b4] px-3 py-2.5 text-sm font-bold text-white disabled:opacity-50">{saved === item.id ? <><Check size={16} />Saved</> : <><Save size={16} />Save</>}</button><button type="button" onClick={() => remove("item", item.id)} disabled={saving === `delete-${item.id}`} className="rounded-xl border border-red-200 p-2.5 text-red-600 disabled:opacity-50"><Trash2 size={16} /></button></div></div></div>)}</div><form onSubmit={e => addItem(e, category.id)} className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/60 p-5 sm:flex-row"><input value={newItems[category.id] ?? ""} onChange={e => setNewItems(current => ({ ...current, [category.id]: e.target.value }))} placeholder="New menu item name" className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 outline-none focus:border-purple-500" /><button type="submit" disabled={saving === `add-${category.id}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-bold text-purple-700 disabled:opacity-50">{saved === `add-${category.id}` ? <><Check size={16} />Added</> : <><Plus size={16} />Add menu item</>}</button></form></section>)}</div></div></main>;
}
