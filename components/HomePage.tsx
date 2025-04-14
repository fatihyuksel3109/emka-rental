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
import { useState, useEffect } from "react";
import CarItemDetailModal from "@/components/ui/CarItemDetailModal";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";

interface Car {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  shiftType: string;
  seats: string;
  fuelType: string;
  transmission: string;
  features: string[];
  available: boolean;
  imageUrl: string;
}

interface CarFeature {
  id: number;
  name: string;
  image: string;
  price: string;
  brand: string;
  model: string;
  year: string;
  shiftType: string;
  seats: string;
  fuelType: string;
  transmission: string;
  features: string[];
}

const HomePage = ({ dict }: { dict: any }) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    async function fetchCarsWithRetry(attempts = 3, delay = 1000) {
      for (let i = 0; i < attempts; i++) {
        try {
          const response = await fetch("/api/cars", { cache: "no-store" });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
          }
          const data = await response.json();
          if (!Array.isArray(data)) {
            throw new Error("Expected an array of cars, got: " + JSON.stringify(data));
          }
          setCars(data);
          setError(null);
          return;
        } catch (err: any) {
          console.error(`Fetch attempt ${i + 1} failed:`, err);
          if (i < attempts - 1) {
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue;
          }
          setError(err.message || (dict.Common?.error || "Failed to load cars"));
          toast({
            title: dict.Common?.error || "Error",
            description: dict.HomePage?.fetchCarsError || "Unable to load cars",
            variant: "destructive",
          });
        }
      }
    }
    fetchCarsWithRetry();
  }, [dict]);

  const showModal = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  const transformToCarFeature = (car: Car | null): CarFeature | null => {
    if (!car) return null;
    return {
      id: parseInt(car._id, 16) % 1000000,
      name: car.name,
      image: car.imageUrl,
      price: car.price,
      brand: car.brand,
      model: car.model,
      year: car.year,
      shiftType: car.shiftType,
      seats: car.seats,
      fuelType: car.fuelType,
      transmission: car.transmission,
      features: car.features,
    };
  };

  return (
    <div className="bg-white">
      <section className="bg-red-600 text-white py-20">
        <Banner dict={dict} />
      </section>
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {dict.HomePage?.showcaseTitle || "Our Luxury Cars"}
          </h2>
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          {cars.length === 0 && !error && (
            <p className="text-center">
              {dict.HomePage?.noCars || "No cars available"}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Card
                key={car._id}
                className={`bg-gray-100 ${!car.available ? "opacity-50" : ""}`}
              >
                <CardHeader>
                  <CardTitle>{car.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {car.imageUrl && !imageErrors[car._id] ? (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={car.imageUrl}
                        alt={car.name}
                        fill
                        style={{ objectFit: "cover" }}
                        onError={() => {
                          console.error(`Failed to load image: ${car.imageUrl}`);
                          setImageErrors((prev) => ({ ...prev, [car._id]: true }));
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 mb-4 bg-gray-300 flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                  <p className="text-xl font-bold">
                    {dict.Common?.currency || "$"}
                    {car.price} / {dict.HomePage?.perDay || "per day"}
                  </p>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button
                    variant="outline"
                    onClick={() => showModal(car)}
                    disabled={!car.available}
                  >
                    {dict.HomePage?.learnMore || "Learn More"}
                  </Button>
                  <Button
                    className="bg-green-500 hover:bg-green-600"
                    disabled={!car.available}
                  >
                    <LucideWheat className="mr-2 h-4 w-4" />
                    {dict.HomePage?.book || "Book Now"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <CarItemDetailModal
        car={transformToCarFeature(selectedCar)}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dict={dict}
      />
    </div>
  );
};

export default HomePage;