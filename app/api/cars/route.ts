import { connectToDatabase } from "@/lib/mongodb";
import Car from "@/models/Car";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const cars = await Car.find({});
    return NextResponse.json(cars);
  } catch (error) {
    console.error("GET /api/cars error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const car = await Car.create({
      name: data.name,
      brand: data.brand,
      model: data.model,
      year: data.year,
      price: data.price,
      shiftType: data.shiftType,
      seats: data.seats,
      fuelType: data.fuelType,
      transmission: data.transmission,
      features: data.features || [],
      available: data.available !== undefined ? data.available : true,
      imageUrl: data.imageUrl,
      category: data.category,
    });
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error("POST /api/cars error:", error);
    return NextResponse.json(
      { error: "Failed to create car" },
      { status: 500 }
    );
  }
}