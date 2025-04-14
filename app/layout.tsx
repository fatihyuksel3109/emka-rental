import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EMKA AUTOMOTIVE",
  description: "Luxury car rentals at your fingertips",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { lang?: string };
}) {
  // Default to 'en' if no language is specified
  const lang = params?.lang || "en";

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
