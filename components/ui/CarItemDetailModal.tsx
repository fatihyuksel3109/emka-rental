"use client";

import React from "react";
import { Modal, Descriptions } from "antd";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LucideWheat } from "lucide-react";

interface CarFeature {
  id: number;
  name: string;
  image: any;
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

interface CarItemDetailModalProps {
  car: CarFeature | null;
  isOpen: boolean;
  onClose: () => void;
  dict?: any;
}

const CarItemDetailModal: React.FC<CarItemDetailModalProps> = ({
  car,
  isOpen,
  onClose,
  dict,
}) => {
  return (
    <Modal
      title={car?.name}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      {car && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <Image
              src={car.image}
              alt={car.name}
              className="w-full h-auto rounded-md"
              width={800}
              height={450}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Descriptions column={1} bordered>
              <Descriptions.Item label={dict.CarDetail.brand}>
                {car.brand}
              </Descriptions.Item>
              <Descriptions.Item label={dict.CarDetail.model}>
                {car.model}
              </Descriptions.Item>
              <Descriptions.Item label={dict.CarDetail.year}>
                {car.year}
              </Descriptions.Item>
              <Descriptions.Item label={dict.CarDetail.transmission}>
                {car.transmission}
              </Descriptions.Item>
              <Descriptions.Item label={dict.CarDetail.seats}>
                {car.seats}
              </Descriptions.Item>
              <Descriptions.Item label={dict.CarDetail.fuelType}>
                {car.fuelType}
              </Descriptions.Item>
              <Descriptions.Item label={dict.CarDetail.price}>
                ${car.price} / {dict.HomePage.perDay}
              </Descriptions.Item>
            </Descriptions>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                {dict.CarDetail.features}
              </h3>
              <ul className="list-disc pl-5">
                {car.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <Button className="bg-green-500 hover:bg-green-600 w-full">
                <LucideWheat className="mr-2 h-4 w-4" /> {dict.HomePage.book}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CarItemDetailModal;
