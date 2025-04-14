import { connectToDatabase } from "@/lib/mongodb";
import Car from "@/models/Car";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const car = await Car.findByIdAndUpdate(
      params.id,
      {
        name: data.name,
        brand: data.brand,
        model: data.model,
        year: data.year,
        price: data.price,
        shiftType: data.shiftType,
        seats: data.seats,
        fuelType: data.fuelType,
        transmission: data.transmission,
        features: data.features,
        available: data.available,
        imageUrl: data.imageUrl,
        category: data.category,
      },
      { new: true }
    );
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json(car);
  } catch (error) {
    console.error("PATCH /api/cars/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update car" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const car = await Car.findByIdAndDelete(params.id);
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/cars/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete car" },
      { status: 500 }
    );
  }
}