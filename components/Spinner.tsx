"use client";

import { LucideCar } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative w-32 h-16">
        {/* Car Icon */}
        <LucideCar
          className="w-16 h-16 text-red-600 animate-car-move"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      {/* Road */}
      <div className="w-64 h-1 bg-red-300 mt-2 relative overflow-hidden">
        <div className="absolute w-full h-1 bg-red-500 animate-road-dash"></div>
      </div>
    </div>
  );
};

export default Spinner;