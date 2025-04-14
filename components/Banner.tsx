import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import heroBigCar from "@/public/images/hero-big-car.png";

interface BannerProps {
  dict: {
    Banner: {
      title: string;
      subtitle: string;
      description: string;
      bookRide: string;
      learnMore: string;
    };
  };
}

const Banner: React.FC<BannerProps> = ({ dict }) => {
  return (
    <div className="relative bg-gradient-to-r from-white to-red-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-red-500">
              {dict.Banner.title}{" "}
              <span className="text-red-500">{dict.Banner.subtitle}</span>
            </h2>
            <p className="text-gray-600 mb-6">{dict.Banner.description}</p>
            <div className="space-x-4">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                {dict.Banner.bookRide}
              </Button>
              <Button
                variant="outline"
                className="text-black border-black hover:bg-gray-100"
              >
                {dict.Banner.learnMore}
              </Button>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 lg:h-96">
            <Image
              src={heroBigCar}
              alt="hero"
              width={800}
              height={450}
              className="absolute right-0 hidden lg:inline-block"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Banner;
