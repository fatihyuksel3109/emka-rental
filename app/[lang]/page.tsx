import { getDictionary } from "@/lib/dictionary";
import HomePage from "@/components/HomePage";

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return <HomePage dict={dict} />;
}