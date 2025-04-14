"use client";

import { getDictionary } from "@/lib/dictionary";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";

const predefinedImages = [
  { value: "/images/egea-triple.jpeg", label: "Egea" },
  { value: "/images/i20-triple-automatic.jpeg", label: "i20" },
  { value: "/images/clio-triple.jpeg", label: "Clio" },
];

interface Car {
  _id?: string;
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
  category: string;
}

export default function AdminDashboard({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [formCar, setFormCar] = useState<Car | null>(null);
  const [featuresInput, setFeaturesInput] = useState("");
  const [dict, setDict] = useState<any>(null);
  const [useCustomImage, setUseCustomImage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchDictionary() {
      try {
        const dictionary = await getDictionary(lang);
        setDict(dictionary);
      } catch (error) {
        console.error("Failed to load dictionary:", error);
        toast({
          title: "Error",
          description: "Failed to load translations",
          variant: "destructive",
        });
      }
    }
    fetchDictionary();
  }, [lang]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/${lang}/admin/login`);
    } else if (status === "authenticated") {
      fetchCars();
    }
  }, [status, router, lang]);

  const fetchCars = async () => {
    try {
      const response = await fetch("/api/cars");
      if (!response.ok) throw new Error("Failed to fetch cars");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      toast({
        title: dict?.Common?.error || "Error",
        description: dict?.AdminDashboard?.fetchCarsError || "Failed to fetch cars",
        variant: "destructive",
      });
    }
  };

  const openAddForm = () => {
    setFormCar({
      name: "",
      brand: "",
      model: "",
      year: "",
      price: "",
      shiftType: "",
      seats: "",
      fuelType: "",
      transmission: "",
      features: [],
      available: true,
      imageUrl: "",
      category: "economic", // Ensure default
    });
    setFeaturesInput("");
    setUseCustomImage(false);
    setIsEditing(false);
  };

  const openEditForm = (car: Car) => {
    setFormCar({
      ...car,
      category: car.category || "economic", // Fallback for existing cars
    });
    setFeaturesInput(car.features.join(", "));
    setUseCustomImage(!predefinedImages.some((img) => img.value === car.imageUrl));
    setIsEditing(true);
  };

  const closeForm = () => {
    setFormCar(null);
    setFeaturesInput("");
    setUseCustomImage(false);
    setIsEditing(false);
  };

  const handleSubmitCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCar) return;

    try {
      const url = isEditing && formCar._id ? `/api/cars/${formCar._id}` : "/api/cars";
      const method = isEditing && formCar._id ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formCar,
          features: featuresInput.split(",").map((f: string) => f.trim()).filter(Boolean),
          category: formCar.category || "economic", // Ensure category is sent
        }),
      });
      if (response.ok) {
        toast({
          title: dict?.Common?.success || "Success",
          description: isEditing
            ? dict?.AdminDashboard?.updateCarSuccess || "Car updated successfully"
            : dict?.AdminDashboard?.addCarSuccess || "Car added successfully",
        });
        closeForm();
        fetchCars();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || (isEditing ? "Failed to update car" : "Failed to add car"));
      }
    } catch (error: any) {
      toast({
        title: dict?.Common?.error || "Error",
        description: error.message || (isEditing
          ? dict?.AdminDashboard?.updateCarError || "Failed to update car"
          : dict?.AdminDashboard?.addCarError || "Failed to add car"),
        variant: "destructive",
      });
    }
  };

  const handleDeleteCar = async (id: string) => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: dict?.Common?.success || "Success",
          description: dict?.AdminDashboard?.deleteCarSuccess || "Car deleted successfully",
        });
        fetchCars();
      } else {
        throw new Error("Failed to delete car");
      }
    } catch (error) {
      toast({
        title: dict?.Common?.error || "Error",
        description: dict?.AdminDashboard?.deleteCarError || "Failed to delete car",
        variant: "destructive",
      });
    }
  };

  const handleToggleAvailability = async (id: string, available: boolean) => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: !available }),
      });
      if (response.ok) {
        toast({
          title: dict?.Common?.success || "Success",
          description: dict?.AdminDashboard?.updateAvailabilitySuccess || "Car availability updated",
        });
        fetchCars();
      } else {
        throw new Error("Failed to update availability");
      }
    } catch (error) {
      toast({
        title: dict?.Common?.error || "Error",
        description: dict?.AdminDashboard?.updateAvailabilityError || "Failed to update availability",
        variant: "destructive",
      });
    }
  };

  const categories = [
    { value: "economic", label: dict?.AdminDashboard?.categories?.economic || "Economic" },
    { value: "mid", label: dict?.AdminDashboard?.categories?.mid || "Mid" },
    { value: "high", label: dict?.AdminDashboard?.categories?.high || "High" },
    { value: "luxury", label: dict?.AdminDashboard?.categories?.luxury || "Luxury" },
    { value: "minibus", label: dict?.AdminDashboard?.categories?.minibus || "Minibus" },
    { value: "suv", label: dict?.AdminDashboard?.categories?.suv || "SUV" },
  ];

  if (status === "loading" || !dict) {
    return <div>{dict?.Common?.loading || "Loading..."}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{dict.AdminDashboard?.title || "Admin Dashboard"}</h1>
        <Button onClick={() => signOut()}>
          {dict.AdminDashboard?.logoutButton || "Logout"}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>{dict.AdminDashboard?.carList || "Car List"}</CardTitle>
              <Button onClick={openAddForm}>
                {dict.AdminDashboard?.addCarButton || "Add New Car"}
              </Button>
            </CardHeader>
            <CardContent>
              {cars.length === 0 ? (
                <p>{dict.AdminDashboard?.noCars || "No cars available"}</p>
              ) : (
                <div className="space-y-4">
                  {cars.map((car) => (
                    <Card key={car._id} className="p-4">
                      <h3 className="font-bold">{car.name}</h3>
                      {car.imageUrl && (
                        <div className="relative w-full h-32 mb-2">
                          <Image
                            src={car.imageUrl}
                            alt={car.name}
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                            priority
                            style={{ objectFit: "cover" }}
                            onError={() => console.error(`Failed to load image: ${car.imageUrl}`)}
                          />
                        </div>
                      )}
                      <p>
                        {dict.AdminDashboard?.price || "Price"}: {dict.Common?.currency || "$"}
                        {car.price}
                      </p>
                      <p className="text-sm capitalize">
                        {dict.AdminDashboard?.category || "Category"}: {dict.AdminDashboard?.categories?.[car.category] || car.category || "Not set"}
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <Label>{dict.AdminDashboard?.available || "Available"}</Label>
                        <Switch
                          checked={car.available}
                          onCheckedChange={() => handleToggleAvailability(car._id!, car.available)}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => openEditForm(car)}>
                          {dict.AdminDashboard?.editButton || "Edit"}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteCar(car._id!)}
                        >
                          {dict.AdminDashboard?.deleteButton || "Delete"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {formCar && (
          <div className="lg:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isEditing
                    ? dict.AdminDashboard?.editCar || "Edit Car"
                    : dict.AdminDashboard?.addCar || "Add New Car"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitCar} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{dict.AdminDashboard?.name || "Name"}</Label>
                    <Input
                      id="name"
                      value={formCar.name}
                      onChange={(e) => setFormCar({ ...formCar, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">{dict.AdminDashboard?.brand || "Brand"}</Label>
                    <Input
                      id="brand"
                      value={formCar.brand}
                      onChange={(e) => setFormCar({ ...formCar, brand: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">{dict.AdminDashboard?.model || "Model"}</Label>
                    <Input
                      id="model"
                      value={formCar.model}
                      onChange={(e) => setFormCar({ ...formCar, model: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">{dict.AdminDashboard?.year || "Year"}</Label>
                    <Input
                      id="year"
                      value={formCar.year}
                      onChange={(e) => setFormCar({ ...formCar, year: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">{dict.AdminDashboard?.price || "Price"}</Label>
                    <Input
                      id="price"
                      value={formCar.price}
                      onChange={(e) => setFormCar({ ...formCar, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shiftType">
                      {dict.AdminDashboard?.shiftType || "Shift Type"}
                    </Label>
                    <Input
                      id="shiftType"
                      value={formCar.shiftType}
                      onChange={(e) => setFormCar({ ...formCar, shiftType: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="seats">{dict.AdminDashboard?.seats || "Seats"}</Label>
                    <Input
                      id="seats"
                      value={formCar.seats}
                      onChange={(e) => setFormCar({ ...formCar, seats: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="fuelType">{dict.AdminDashboard?.fuelType || "Fuel Type"}</Label>
                    <Input
                      id="fuelType"
                      value={formCar.fuelType}
                      onChange={(e) => setFormCar({ ...formCar, fuelType: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="transmission">
                      {dict.AdminDashboard?.transmission || "Transmission"}
                    </Label>
                    <Input
                      id="transmission"
                      value={formCar.transmission}
                      onChange={(e) => setFormCar({ ...formCar, transmission: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">{dict.AdminDashboard?.category || "Category"}</Label>
                    <select
                      id="category"
                      value={formCar.category}
                      onChange={(e) => setFormCar({ ...formCar, category: e.target.value })}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="" disabled>
                        {dict.AdminDashboard?.selectCategoryPlaceholder || "Select a category"}
                      </option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="features">{dict.AdminDashboard?.features || "Features"}</Label>
                    <Input
                      id="features"
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      placeholder={dict.AdminDashboard?.featuresPlaceholder || "Enter features separated by commas"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <Label>{dict.AdminDashboard?.useCustomImage || "Use Custom Image URL"}</Label>
                      <Switch
                        checked={useCustomImage}
                        onCheckedChange={setUseCustomImage}
                      />
                    </div>
                    {useCustomImage ? (
                      <div>
                        <Label htmlFor="imageUrl">{dict.AdminDashboard?.imageUrl || "Image URL"}</Label>
                        <Input
                          id="imageUrl"
                          value={formCar.imageUrl}
                          onChange={(e) => setFormCar({ ...formCar, imageUrl: e.target.value })}
                          placeholder="https://example.com/car.jpg"
                          required
                        />
                      </div>
                    ) : (
                      <div>
                        <Label htmlFor="imageSelect">{dict.AdminDashboard?.selectImage || "Select Image"}</Label>
                        <select
                          id="imageSelect"
                          value={formCar.imageUrl}
                          onChange={(e) => setFormCar({ ...formCar, imageUrl: e.target.value })}
                          className="w-full p-2 border rounded"
                          required
                        >
                          <option value="" disabled>
                            {dict.AdminDashboard?.selectImagePlaceholder || "Choose an image"}
                          </option>
                          {predefinedImages.map((img) => (
                            <option key={img.value} value={img.value}>
                              {img.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2 flex space-x-4">
                    <Button type="submit">
                      {isEditing
                        ? dict.AdminDashboard?.updateButton || "Update Car"
                        : dict.AdminDashboard?.addButton || "Add Car"}
                    </Button>
                    <Button type="button" variant="outline" onClick={closeForm}>
                      {dict.AdminDashboard?.cancelButton || "Cancel"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}