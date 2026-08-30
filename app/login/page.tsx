"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true); setError("");
    const result = await authClient.signIn.email({ email: email.trim(), password, rememberMe: true, callbackURL: "/admin" });
    if (result.error) { setError(result.error.message || "Invalid email or password."); setLoading(false); return; }
    router.replace("/admin");
    router.refresh();
  }

  return <main className="min-h-screen bg-[#f7f4fb] px-5 py-10"><div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center"><div className="w-full rounded-[32px] bg-white p-7 shadow-xl shadow-purple-100 md:p-9"><Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-purple-700"><ArrowLeft size={16} />Back to EATMO</Link><div className="mt-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700"><LockKeyhole size={26} /></div><p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-purple-600">EATMO</p><h1 className="mt-2 text-3xl font-bold">Owner login</h1><p className="mt-2 text-sm leading-6 text-gray-500">Sign in to manage the restaurant menu.</p><form onSubmit={submit} className="mt-8 space-y-4"><label className="block text-sm font-semibold text-gray-700">Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none focus:border-purple-500" /></label><label className="block text-sm font-semibold text-gray-700">Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" required className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none focus:border-purple-500" /></label>{error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}<button disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-[#4b249f] via-[#6d3fd1] to-[#9467df] px-5 py-3.5 font-bold text-white shadow-lg shadow-purple-200 disabled:opacity-50">{loading ? "Signing in…" : "Sign in"}</button></form></div></div></main>;
}
