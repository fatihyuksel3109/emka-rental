import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/dictionary";
import ClientProvider from "@/components/ClientProvider";

export default async function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <div>
      <ClientProvider>
        <Navbar dict={dict} lang={lang} />
        <main>{children}</main>
        <Footer dict={dict} lang={lang} />
      </ClientProvider>
    </div>
  );
}