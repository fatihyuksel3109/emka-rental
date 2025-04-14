import { connectToDatabase } from "../../../../lib/mongodb";
import Car from "../../../../models/Car";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    await Car.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Car deleted" });
  } catch (error) {
    console.error("Failed to delete car:", error);
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const car = await Car.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(car);
  } catch (error) {
    console.error("Failed to update car:", error);
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
  }
}