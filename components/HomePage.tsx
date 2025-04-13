"use client";

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
import Image from "next/image";
import EgeaTriple from "@/public/images/egea-triple.jpeg";
import I20TripleAutomatic from "@/public/images/i20-triple-automatic.jpeg";
import { useState } from "react";
import CarItemDetailModal from "@/components/ui/CarItemDetailModal";

const HomePage = ({ dict }: { dict: any }) => {
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cars = [
    {
      id: 1,
      name: "Fiat Egea - Manual",
      image: EgeaTriple,
      price: "100",
      brand: "Fiat",
      model: "Egea",
      year: "2022",
      shiftType: "Manual",
      seats: "5",
      fuelType: "Petrol",
      transmission: "Manual",
      features: [
        "Air Conditioning",
        "Bluetooth",
        "USB Port",
        "Parking Sensors",
      ],
    },
    {
      id: 2,
      name: "Hyundai I20 - Automatic",
      image: I20TripleAutomatic,
      price: "120",
      brand: "Hyundai",
      model: "I20",
      year: "2023",
      shiftType: "Automatic",
      seats: "5",
      fuelType: "Petrol",
      transmission: "Automatic",
      features: [
        "Air Conditioning",
        "Bluetooth",
        "USB Port",
        "Parking Sensors",
        "Cruise Control",
      ],
    },
    {
      id: 3,
      name: "Hyundai I20 - Automatic",
      image: I20TripleAutomatic,
      price: "150",
      brand: "Hyundai",
      model: "I20",
      year: "2023",
      shiftType: "Automatic",
      seats: "5",
      fuelType: "Petrol",
      transmission: "Automatic",
      features: [
        "Air Conditioning",
        "Bluetooth",
        "USB Port",
        "Parking Sensors",
        "Cruise Control",
        "GPS Navigation",
      ],
    },
  ];

  const showModal = (car: any) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white">
      {/* Banner Section */}
      <section className="bg-red-600 text-white py-20">
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
                  <Image
                    src={car.image}
                    alt={car.name}
                    className="w-full h-56 object-cover mb-4 hover:scale-105 transition-transform duration-300"
                    width={800}
                    height={450}
                    priority
                  />
                  <p className="text-xl font-bold">
                    {dict.Common.currency}
                    {car.price} / {dict.HomePage.perDay}
                  </p>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" onClick={() => showModal(car)}>
                    {dict.HomePage.learnMore}
                  </Button>
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

      {/* Car Details Modal */}
      <CarItemDetailModal
        car={selectedCar}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dict={dict}
      />
    </div>
  );
};

export default HomePage;
