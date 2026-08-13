import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EATMO Cabana & Restaurant | Ingiriya",
  description: "EATMO Cabana & Restaurant in Ingiriya — explore our menu, find us on the map, call or WhatsApp us.",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
