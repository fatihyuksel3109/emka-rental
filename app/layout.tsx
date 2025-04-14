import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EMKA AUTOMOTIVE",
  description: "Luxury car rentals at your fingertips",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Extract lang from pathname (e.g., /tr, /en)
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "/";
  const lang = pathname.split("/")[1] || "en"; // Defaults to "en"

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}