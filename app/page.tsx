import HomePage from "@/components/HomePage";

// The menu is managed in the database, so the public homepage must render
// fresh data on each request instead of being statically generated at build time.
export const dynamic = "force-dynamic";

export default function Page() {
  return <HomePage />;
}
