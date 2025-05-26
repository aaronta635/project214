"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, Clock, Plane, PlaneTakeoff } from "lucide-react"
import Link from "next/link"

// Flight type definition
interface Flight {
  id: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  date: string
  airline: string
  stops: string
}

export default function FlightsPage() {
  const searchParams = useSearchParams()
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)

  // Get search parameters
  const fromLocation = searchParams.get("from") || ""
  const toLocation = searchParams.get("to") || ""
  const departureDate = searchParams.get("departure") || ""
  const returnDate = searchParams.get("return") || ""
  const passengers = searchParams.get("passengers") || "1"

  // Format the departure date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Generate flights based on search parameters
  useEffect(() => {
    // Simulate loading
    setLoading(true)

    // Generate random flights based on user input
    const generateFlights = () => {
      if (!fromLocation || !toLocation || !departureDate) {
        setFlights([])
        setLoading(false)
        return
      }

      const formattedDate = formatDate(departureDate)

      // Generate random flight times
      const morningDeparture = "08:30 AM"
      const afternoonDeparture = "12:45 PM"
      const eveningDeparture = "6:30 PM"

      // Calculate arrival times and durations based on destinations
      const calculateFlightDetails = (from: string, to: string, departureTime: string) => {
        // Simplified logic - in a real app, this would be more sophisticated
        let durationHours = 0

        // Asia-Pacific route durations
        if ((from.includes("NRT") && to.includes("SYD")) || (from.includes("SYD") && to.includes("NRT"))) {
          durationHours = 9 // Tokyo to Sydney
        } else if ((from.includes("ICN") && to.includes("MEL")) || (from.includes("MEL") && to.includes("ICN"))) {
          durationHours = 10 // Seoul to Melbourne
        } else if ((from.includes("BKK") && to.includes("AKL")) || (from.includes("AKL") && to.includes("BKK"))) {
          durationHours = 11 // Bangkok to Auckland
        } else if ((from.includes("SIN") && to.includes("CGK")) || (from.includes("CGK") && to.includes("SIN"))) {
          durationHours = 2 // Singapore to Jakarta
        } else if ((from.includes("HKG") && to.includes("KUL")) || (from.includes("KUL") && to.includes("HKG"))) {
          durationHours = 3 // Hong Kong to Kuala Lumpur
        } else if ((from.includes("MNL") && to.includes("BOM")) || (from.includes("BOM") && to.includes("MNL"))) {
          durationHours = 8 // Manila to Mumbai
        } else {
          durationHours = 5 // Default for regional flights
        }

        // Calculate arrival time
        const depHours = Number.parseInt(departureTime.split(":")[0])
        const isPM = departureTime.includes("PM")
        let depTimeHours = depHours
        if (isPM && depHours !== 12) depTimeHours += 12
        if (!isPM && depHours === 12) depTimeHours = 0

        const arrivalHours = (depTimeHours + durationHours) % 24
        const arrivalPeriod = arrivalHours >= 12 ? "PM" : "AM"
        const displayArrivalHours = arrivalHours > 12 ? arrivalHours - 12 : arrivalHours === 0 ? 12 : arrivalHours

        const arrivalTime = `${displayArrivalHours}:${departureTime.split(":")[1].split(" ")[0]} ${arrivalPeriod}`
        const duration = `${durationHours}h 0m`

        return { arrivalTime, duration }
      }

      // Calculate prices based on destinations and time of day
      const calculatePrice = (from: string, to: string, departureTime: string) => {
        let basePrice = 0

        // Asia-Pacific pricing
        if ((from.includes("NRT") && to.includes("SYD")) || (from.includes("SYD") && to.includes("NRT"))) {
          basePrice = 800 // Tokyo to Sydney
        } else if ((from.includes("ICN") && to.includes("MEL")) || (from.includes("MEL") && to.includes("ICN"))) {
          basePrice = 850 // Seoul to Melbourne
        } else if ((from.includes("BKK") && to.includes("AKL")) || (from.includes("AKL") && to.includes("BKK"))) {
          basePrice = 900 // Bangkok to Auckland
        } else if ((from.includes("SIN") && to.includes("CGK")) || (from.includes("CGK") && to.includes("SIN"))) {
          basePrice = 200 // Singapore to Jakarta
        } else if ((from.includes("HKG") && to.includes("KUL")) || (from.includes("KUL") && to.includes("HKG"))) {
          basePrice = 250 // Hong Kong to Kuala Lumpur
        } else if ((from.includes("MNL") && to.includes("BOM")) || (from.includes("BOM") && to.includes("MNL"))) {
          basePrice = 600 // Manila to Mumbai
        } else {
          basePrice = 400 // Default for regional flights
        }

        // Time of day adjustments
        if (departureTime.includes("AM")) {
          basePrice += 50 // Morning premium
        } else if (departureTime.includes("6:30 PM")) {
          basePrice -= 30 // Evening discount
        }

        // Add some randomness
        const randomAdjustment = Math.floor(Math.random() * 50) - 25
        return basePrice + randomAdjustment
      }

      // Generate three flight options with different times
      const morningDetails = calculateFlightDetails(fromLocation, toLocation, morningDeparture)
      const afternoonDetails = calculateFlightDetails(fromLocation, toLocation, afternoonDeparture)
      const eveningDetails = calculateFlightDetails(fromLocation, toLocation, eveningDeparture)

      const generatedFlights: Flight[] = [
        {
          id: `FL${Math.floor(1000 + Math.random() * 9000)}`,
          from: fromLocation,
          to: toLocation,
          departureTime: morningDeparture,
          arrivalTime: morningDetails.arrivalTime,
          duration: morningDetails.duration,
          price: calculatePrice(fromLocation, toLocation, morningDeparture),
          date: formattedDate,
          airline: "FlyDreamAir",
          stops: "Non-stop",
        },
        {
          id: `FL${Math.floor(1000 + Math.random() * 9000)}`,
          from: fromLocation,
          to: toLocation,
          departureTime: afternoonDeparture,
          arrivalTime: afternoonDetails.arrivalTime,
          duration: afternoonDetails.duration,
          price: calculatePrice(fromLocation, toLocation, afternoonDeparture),
          date: formattedDate,
          airline: "FlyDreamAir",
          stops: "Non-stop",
        },
        {
          id: `FL${Math.floor(1000 + Math.random() * 9000)}`,
          from: fromLocation,
          to: toLocation,
          departureTime: eveningDeparture,
          arrivalTime: eveningDetails.arrivalTime,
          duration: eveningDetails.duration,
          price: calculatePrice(fromLocation, toLocation, eveningDeparture),
          date: formattedDate,
          airline: "FlyDreamAir",
          stops: "Non-stop",
        },
      ]

      setFlights(generatedFlights)
      setLoading(false)
    }

    // Simulate API call delay
    const timer = setTimeout(() => {
      generateFlights()
    }, 500)

    return () => clearTimeout(timer)
  }, [fromLocation, toLocation, departureDate])

  // Calculate the lowest price for the summary card
  const lowestPrice = flights.length > 0 ? Math.min(...flights.map((flight) => flight.price)) : 0

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
        <div className="container py-10 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-background mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-sky-700 dark:text-sky-300">
              {fromLocation} to {toLocation}
            </h1>
            <p className="text-muted-foreground">
              {formatDate(departureDate)} · {passengers}{" "}
              {Number.parseInt(passengers) === 1 ? "Passenger" : "Passengers"} · Economy
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 max-w-6xl mx-auto">
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-center">Filter Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="best">
                    <TabsList className="grid w-full grid-cols-4 bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                      <TabsTrigger
                        value="best"
                        className="data-[state=active]:bg-sky-600 data-[state=active]:text-white"
                      >
                        Best
                      </TabsTrigger>
                      <TabsTrigger
                        value="cheapest"
                        className="data-[state=active]:bg-sky-600 data-[state=active]:text-white"
                      >
                        Cheapest
                      </TabsTrigger>
                      <TabsTrigger
                        value="fastest"
                        className="data-[state=active]:bg-sky-600 data-[state=active]:text-white"
                      >
                        Fastest
                      </TabsTrigger>
                      <TabsTrigger
                        value="departure"
                        className="data-[state=active]:bg-sky-600 data-[state=active]:text-white"
                      >
                        Departure
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-pulse text-sky-600">Loading flights...</div>
                </div>
              ) : flights.length === 0 ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium mb-2">No flights found</h3>
                      <p className="text-muted-foreground">Please try different search criteria.</p>
                      <Button className="mt-4 bg-sky-600 hover:bg-sky-700 text-white" asChild>
                        <Link href="/">Return to Search</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                flights.map((flight) => (
                  <Card key={flight.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Plane className="h-5 w-5 text-sky-500" />
                              <span className="font-medium">{flight.airline}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{flight.id}</span>
                          </div>
                          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                            <div>
                              <div className="text-xl font-bold">{flight.departureTime}</div>
                              <div className="text-sm text-muted-foreground">{flight.from}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-sm font-medium">{flight.duration}</div>
                              <div className="relative w-24 flex items-center">
                                <div className="h-[2px] flex-1 bg-border"></div>
                                <PlaneTakeoff className="h-3 w-3 mx-1 text-sky-500" />
                                <div className="h-[2px] flex-1 bg-border"></div>
                              </div>
                              <div className="text-xs text-muted-foreground">{flight.stops}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold">{flight.arrivalTime}</div>
                              <div className="text-sm text-muted-foreground">{flight.to}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              {flight.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              {flight.duration}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                          <div className="text-2xl font-bold">${flight.price}</div>
                          <Link
                            href={`/flights/${flight.id}/seats?from=${encodeURIComponent(flight.from)}&to=${encodeURIComponent(flight.to)}&departure=${encodeURIComponent(departureDate)}&price=${flight.price}&passengers=${passengers}`}
                          >
                            <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                              Select
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {flights.length > 0 && (
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-center">Price Summary</CardTitle>
                    <CardDescription className="text-center">
                      Flight from {fromLocation} to {toLocation}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Base fare</span>
                      <span>${Math.floor(lowestPrice * 0.9)}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span>${Math.floor(lowestPrice * 0.1)}.00</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${lowestPrice}.00</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white" disabled>
                      Continue to Booking
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
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
