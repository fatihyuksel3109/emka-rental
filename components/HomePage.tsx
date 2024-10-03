import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideWheat } from "lucide-react";
import Banner from "./Banner";

const HomePage = ({ dict }: { dict: any }) => {
  const cars = [
    {
      id: 1,
      name: "Luxury Sedan",
      image: "/api/placeholder/400/300",
      price: "100",
    },
    { id: 2, name: "SUV", image: "/api/placeholder/400/300", price: "120" },
    {
      id: 3,
      name: "Sports Car",
      image: "/api/placeholder/400/300",
      price: "150",
    },
  ];

  return (
    <div className="bg-white">
      {/* Banner Section */}
      <section className="bg-red-600 text-white py-20">
        {/* <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            {dict.HomePage.bannerTitle}
          </h1>
          <p className="text-xl mb-8">{dict.HomePage.bannerSubtitle}</p>
          <Button className="bg-gold text-black hover:bg-gold-600">
            {dict.HomePage.exploreButton}
          </Button>
        </div> */}
        <Banner dict={dict} />
      </section>

      {/* Showcase Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {dict.HomePage.showcaseTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Card key={car.id} className="bg-gray-100">
                <CardHeader>
                  <CardTitle>{car.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <p className="text-xl font-bold">
                    ${car.price} / {dict.HomePage.perDay}
                  </p>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline">{dict.HomePage.learnMore}</Button>
                  <Button className="bg-green-500 hover:bg-green-600">
                    <LucideWheat className="mr-2 h-4 w-4" />{" "}
                    {dict.HomePage.book}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
