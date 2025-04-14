import { connectToDatabase } from "../../../lib/mongodb";
import Car from "../../../models/Car";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const cars = await Car.find().exec();
    return NextResponse.json(cars);
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const car = new Car(body);
    await car.save();
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error("Failed to create car:", error);
    return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
  }
}