import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user?.role === "admin" ? session : null;
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const categories = await prisma.menuCategory.findMany({ orderBy: { sortOrder: "asc" }, include: { items: { orderBy: { sortOrder: "asc" } } } });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();

  if (body.type === "category") {
    const name = String(body.name ?? "").trim();
    if (!name) return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    const count = await prisma.menuCategory.count();
    return NextResponse.json(await prisma.menuCategory.create({ data: { name, notes: [], sortOrder: count } }), { status: 201 });
  }

  if (body.type === "item") {
    const categoryId = String(body.categoryId ?? "");
    const name = String(body.name ?? "").trim();
    if (!categoryId || !name) return NextResponse.json({ error: "Category and item name are required" }, { status: 400 });
    const count = await prisma.menuItem.count({ where: { categoryId } });
    return NextResponse.json(await prisma.menuItem.create({ data: { categoryId, name, sortOrder: count } }), { status: 201 });
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();

  if (body.type === "category") {
    const id = String(body.id ?? "");
    const name = String(body.name ?? "").trim();
    if (!id || !name) return NextResponse.json({ error: "Category id and name are required" }, { status: 400 });
    return NextResponse.json(await prisma.menuCategory.update({ where: { id }, data: { name, notes: Array.isArray(body.notes) ? body.notes.map(String) : [], sortOrder: Number(body.sortOrder ?? 0), active: Boolean(body.active) } }));
  }

  if (body.type === "item") {
    const id = String(body.id ?? "");
    const name = String(body.name ?? "").trim();
    if (!id || !name) return NextResponse.json({ error: "Item id and name are required" }, { status: 400 });
    const nullableNumber = (value: unknown) => value === "" || value == null ? null : Number(value);
    return NextResponse.json(await prisma.menuItem.update({ where: { id }, data: { name, description: body.description ? String(body.description) : null, price: nullableNumber(body.price), small: nullableNumber(body.small), large: nullableNumber(body.large), unit: body.unit ? String(body.unit) : null, sortOrder: Number(body.sortOrder ?? 0), available: Boolean(body.available) } }));
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const id = String(body.id ?? "");
  if (!id || !["category", "item"].includes(body.type)) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  if (body.type === "category") await prisma.menuCategory.delete({ where: { id } });
  else await prisma.menuItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
