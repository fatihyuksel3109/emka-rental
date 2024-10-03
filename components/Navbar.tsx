"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";

interface NavbarProps {
  dict: {
    Navbar: {
      home: string;
      about: string;
      vehicleModels: string;
      testimonials: string;
      ourTeam: string;
      contact: string;
      languageSwitch: string;
    };
  };
  lang: string;
}

const Navbar: React.FC<NavbarProps> = ({ dict, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const switchLanguage = (newLang: string) => {
    const currentPathWithoutLang = pathname.replace(`/${lang}`, "");
    return `/${newLang}${currentPathWithoutLang}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    "home",
    "about",
    "vehicleModels",
    "testimonials",
    "ourTeam",
    "contact",
  ];

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Button
          key={item}
          variant="ghost"
          className={`text-black hover:text-yellow-400 hover:bg-white ${
            mobile ? "w-full justify-start" : ""
          }`}
          asChild
        >
          <Link
            href={`/${lang}${item === "home" ? "" : `/${item}`}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {dict.Navbar[item as keyof typeof dict.Navbar]}
          </Link>
        </Button>
      ))}
    </>
  );

  return (
    <nav className=" text-white p-4 shadow-lg bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href={`/${lang}`}
          className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          CarRental
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-2 items-center">
          <NavItems />
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              className="text-black border-white hover:bg-white hover:text-yellow-400"
              onClick={() => setIsOpen(!isOpen)}
            >
              {dict.Navbar.languageSwitch}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link
                  href={switchLanguage("en")}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-2">🇬🇧</span> English
                </Link>
                <Link
                  href={switchLanguage("tr")}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-2">🇹🇷</span> Türkçe
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4">
          <NavItems mobile />
          <Button
            variant="outline"
            className="w-full justify-start text-black border-white hover:bg-gray-800 hover:text-yellow-400 mt-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {dict.Navbar.languageSwitch}{" "}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          {isOpen && (
            <div className="mt-2 w-full bg-white rounded-md shadow-lg z-10">
              <Link
                href={switchLanguage("en")}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className="mr-2">🇬🇧</span> English
              </Link>
              <Link
                href={switchLanguage("tr")}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className="mr-2">🇹🇷</span> Türkçe
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
