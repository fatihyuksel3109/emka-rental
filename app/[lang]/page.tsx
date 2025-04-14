"use client";

import { getDictionary } from "@/lib/dictionary";
import HomePage from "@/components/HomePage";
import { useState, useEffect } from "react";

export default function Page({ params }: { params: { lang: string } }) {
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    async function fetchDictionary() {
      try {
        const dictionary = await getDictionary(params.lang);
        setDict(dictionary);
      } catch (error) {
        console.error("Failed to load dictionary:", error);
      }
    }
    fetchDictionary();
  }, [params.lang]);

  if (!dict) {
    return <div>Loading...</div>;
  }

  return <HomePage dict={dict} />;
}