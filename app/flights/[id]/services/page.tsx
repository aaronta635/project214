"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ArrowRight, Coffee, Utensils, Wifi } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Service {
  id: string
  name: string
  price: number
  selected: boolean
}

export default function ServicesPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const fromLocation = searchParams.get("from") || ""
  const toLocation = searchParams.get("to") || ""
  const departureDate = searchParams.get("departure") || ""
  const basePrice = Number.parseInt(searchParams.get("price") || "0")
  const selectedSeats = searchParams.get("seats")?.split(",") || []
  const seatPrice = Number.parseInt(searchParams.get("seatPrice") || "0")

  // Format the departure date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Meal options with image placeholders
  const [meals, setMeals] = useState([
    {
      id: "chicken",
      name: "Grilled Chicken",
      description: "Grilled chicken breast with seasonal vegetables and mashed potatoes.",
      price: 15.99,
      selected: true,
      image: "/placeholder.svg?height=160&width=320&text=Grilled+Chicken",
    },
    {
      id: "pasta",
      name: "Vegetarian Pasta",
      description: "Penne pasta with roasted vegetables in a tomato sauce.",
      price: 13.99,
      selected: false,
      image: "/placeholder.svg?height=160&width=320&text=Vegetarian+Pasta",
    },
    {
      id: "beef",
      name: "Beef Tenderloin",
      description: "Beef tenderloin with red wine sauce and roasted potatoes.",
      price: 18.99,
      selected: false,
      image: "/placeholder.svg?height=160&width=320&text=Beef+Tenderloin",
    },
    {
      id: "salmon",
      name: "Grilled Salmon",
      description: "Grilled salmon fillet with lemon butter sauce and rice pilaf.",
      price: 17.99,
      selected: false,
      image: "/placeholder.svg?height=160&width=320&text=Grilled+Salmon",
    },
  ])

  // Additional services
  const [services, setServices] = useState<Service[]>([
    { id: "wifi", name: "In-flight Wi-Fi", price: 12.99, selected: true },
    { id: "snacks", name: "Premium Snack Box", price: 8.99, selected: false },
    { id: "beverages", name: "Unlimited Beverages", price: 9.99, selected: true },
  ])

  // Calculate total price for meals and services
  const [mealsAndServicesPrice, setMealsAndServicesPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const selectedMealsPrice = meals.filter((meal) => meal.selected).reduce((sum, meal) => sum + meal.price, 0)

    const selectedServicesPrice = services
      .filter((service) => service.selected)
      .reduce((sum, service) => sum + service.price, 0)

    const totalMealsAndServices = selectedMealsPrice + selectedServicesPrice
    setMealsAndServicesPrice(Number.parseFloat(totalMealsAndServices.toFixed(2)))
    setTotalPrice(basePrice + seatPrice + totalMealsAndServices)
  }, [meals, services, basePrice, seatPrice])

  // Toggle meal selection
  const toggleMeal = (id: string) => {
    setMeals(
      meals.map((meal) => {
        if (meal.id === id) {
          return { ...meal, selected: !meal.selected }
        }
        // Only one meal can be selected at a time
        return { ...meal, selected: meal.id === id }
      }),
    )
  }

  // Toggle service selection
  const toggleService = (id: string) => {
    setServices(
      services.map((service) => {
        if (service.id === id) {
          return { ...service, selected: !service.selected }
        }
        return service
      }),
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-screen-2xl mx-auto">
          <MainNav />
          <div className="flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-10 mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-sky-700 dark:text-sky-300">In-Flight Services</h1>
            <p className="text-muted-foreground">
              Flight {params.id} · {fromLocation} to {toLocation} · {formatDate(departureDate)}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 max-w-6xl mx-auto">
            <div className="space-y-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Meal Selection</CardTitle>
                  <CardDescription>Choose your in-flight meal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {meals.map((meal) => (
                      <div key={meal.id} className="border rounded-lg p-4 flex flex-col h-full">
                        <div className="relative h-40 mb-4">
                          <Image
                            src={meal.image || "/placeholder.svg"}
                            alt={meal.name}
                            fill
                            className="rounded-md object-cover"
                          />
                          {meal.selected && (
                            <div className="absolute top-2 right-2 bg-sky-600 text-white text-xs px-2 py-1 rounded">
                              Selected
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{meal.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{meal.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">${meal.price.toFixed(2)}</span>
                            <Checkbox
                              id={meal.id}
                              checked={meal.selected}
                              onCheckedChange={() => toggleMeal(meal.id)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Additional Services</CardTitle>
                  <CardDescription>Enhance your flight experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-start space-x-4 border rounded-lg p-4">
                        {service.id === "wifi" ? (
                          <Wifi className="h-6 w-6 text-sky-500 mt-1" />
                        ) : service.id === "snacks" ? (
                          <Utensils className="h-6 w-6 text-sky-500 mt-1" />
                        ) : (
                          <Coffee className="h-6 w-6 text-sky-500 mt-1" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{service.name}</h3>
                            <span className="font-medium">${service.price.toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {service.id === "wifi"
                              ? "Stay connected throughout your flight with high-speed internet access."
                              : service.id === "snacks"
                                ? "Enjoy a selection of premium snacks and treats during your flight."
                                : "Unlimited non-alcoholic beverages throughout your flight."}
                          </p>
                          <div className="mt-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={service.id}
                                checked={service.selected}
                                onCheckedChange={() => toggleService(service.id)}
                              />
                              <Label htmlFor={service.id}>Add to booking</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader className="text-center">
                  <CardTitle>Your Selection</CardTitle>
                  <CardDescription>Flight {params.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">Selected Seats</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedSeats.map((seat) => (
                        <div
                          key={seat}
                          className="px-3 py-1 bg-sky-100 text-sky-800 rounded-md dark:bg-sky-900 dark:text-sky-100"
                        >
                          {seat}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Meal Selection</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {meals
                        .filter((meal) => meal.selected)
                        .map((meal) => (
                          <div
                            key={meal.id}
                            className="px-3 py-1 bg-sky-100 text-sky-800 rounded-md dark:bg-sky-900 dark:text-sky-100"
                          >
                            {meal.name}
                          </div>
                        ))}
                      {!meals.some((meal) => meal.selected) && (
                        <div className="text-sm text-muted-foreground">No meal selected</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Additional Services</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {services
                        .filter((service) => service.selected)
                        .map((service) => (
                          <div
                            key={service.id}
                            className="px-3 py-1 bg-sky-100 text-sky-800 rounded-md dark:bg-sky-900 dark:text-sky-100"
                          >
                            {service.name}
                          </div>
                        ))}
                      {!services.some((service) => service.selected) && (
                        <div className="text-sm text-muted-foreground">No services selected</div>
                      )}
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Base fare</span>
                    <span>${basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seat selection</span>
                    <span>${seatPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meals & Services</span>
                    <span>${mealsAndServicesPrice.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link
                    href={`/flights/${params.id}/checkout?from=${encodeURIComponent(fromLocation)}&to=${encodeURIComponent(toLocation)}&departure=${encodeURIComponent(departureDate)}&total=${totalPrice.toFixed(2)}`}
                    className="w-full"
                  >
                    <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                      Continue to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 FlyDreamAir. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
