import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/dictionary";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EMKA AUTOMOTIVE",
  description: "Luxury car rentals at your fingertips",
};

export default async function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <ClientProvider>
          <Navbar dict={dict} lang={lang} />
          <main>{children}</main>
          <Footer dict={dict} lang={lang} />
        </ClientProvider>
      </body>
    </html>
  );
}