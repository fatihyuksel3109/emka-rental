import { getDictionary } from "@/lib/dictionary";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SignInForm } from "@/components/SignInForm";

export default async function LoginPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession();
  const dict = await getDictionary(lang);

  if (session) {
    redirect(`/${lang}/admin`);
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {dict.AdminLogin.title}
      </h1>
      <SignInForm dict={dict} />
    </div>
  );
}