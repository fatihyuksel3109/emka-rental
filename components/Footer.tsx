import React from "react";
import Link from "next/link";

const Footer = ({ dict, lang }: { dict: any; lang: string }) => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-gold text-lg font-bold mb-4">
            {dict.Footer.companyName}
          </h3>
          <p>{dict.Footer.companyDescription}</p>
        </div>
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-gold text-lg font-bold mb-4">
            {dict.Footer.quickLinks}
          </h3>
          <ul>
            <li>
              <Link href={`/${lang}`}>{dict.Navbar.home}</Link>
            </li>
            <li>
              <Link href={`/${lang}/about`}>{dict.Navbar.about}</Link>
            </li>
            <li>
              <Link href={`/${lang}/vehicle-models`}>
                {dict.Navbar.vehicleModels}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/contact`}>{dict.Navbar.contact}</Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-gold text-lg font-bold mb-4">
            {dict.Footer.contact}
          </h3>
          <p>{dict.Footer.address}</p>
          <p>{dict.Footer.phone}</p>
          <p>{dict.Footer.email}</p>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-4 border-t border-gray-700 text-center">
        <p>
          © 2024 {dict.Footer.companyName}. {dict.Footer.allRightsReserved}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
