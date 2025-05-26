"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function Home() {
  const router = useRouter()
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [passengers, setPassengers] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Format the query parameters
    const queryParams = new URLSearchParams()
    if (fromLocation) queryParams.append("from", fromLocation)
    if (toLocation) queryParams.append("to", toLocation)
    if (departureDate) queryParams.append("departure", departureDate)
    if (returnDate) queryParams.append("return", returnDate)
    if (passengers) queryParams.append("passengers", passengers)

    // Navigate to the flights page with the query parameters
    router.push(`/flights?${queryParams.toString()}`)
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-background">
          <div className="container px-4 md:px-6 mx-auto flex flex-col items-center">
            <div className="flex flex-col items-center space-y-4 text-center w-full">
              <div className="space-y-2 max-w-[800px] mx-auto">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-sky-600 dark:text-sky-400">
                  Fly Dream Air
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Experience elegance in the skies. Book your next journey with FlyDreamAir.
                </p>
              </div>
            </div>
            <div className="w-full max-w-5xl mx-auto mt-8 grid items-center gap-6 py-12">
              <Card className="border-sky-100 dark:border-sky-900 shadow-md w-full max-w-4xl mx-auto">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-300 text-center mb-6">
                      Find Your Flight
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 border rounded-md p-3 border-sky-200 dark:border-sky-800">
                        <MapPin className="h-5 w-5 text-sky-500" />
                        <Select value={fromLocation} onValueChange={setFromLocation} required>
                          <SelectTrigger className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0">
                            <SelectValue placeholder="From" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tokyo (NRT)">Tokyo (NRT)</SelectItem>
                            <SelectItem value="Seoul (ICN)">Seoul (ICN)</SelectItem>
                            <SelectItem value="Bangkok (BKK)">Bangkok (BKK)</SelectItem>
                            <SelectItem value="Singapore (SIN)">Singapore (SIN)</SelectItem>
                            <SelectItem value="Hong Kong (HKG)">Hong Kong (HKG)</SelectItem>
                            <SelectItem value="Manila (MNL)">Manila (MNL)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3 border-sky-200 dark:border-sky-800">
                        <MapPin className="h-5 w-5 text-sky-500" />
                        <Select value={toLocation} onValueChange={setToLocation} required>
                          <SelectTrigger className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0">
                            <SelectValue placeholder="To" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sydney (SYD)">Sydney (SYD)</SelectItem>
                            <SelectItem value="Melbourne (MEL)">Melbourne (MEL)</SelectItem>
                            <SelectItem value="Auckland (AKL)">Auckland (AKL)</SelectItem>
                            <SelectItem value="Jakarta (CGK)">Jakarta (CGK)</SelectItem>
                            <SelectItem value="Kuala Lumpur (KUL)">Kuala Lumpur (KUL)</SelectItem>
                            <SelectItem value="Mumbai (BOM)">Mumbai (BOM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 border rounded-md p-3 border-sky-200 dark:border-sky-800">
                        <Calendar className="h-5 w-5 text-sky-500" />
                        <Input
                          className="border-0 focus-visible:ring-0"
                          type="date"
                          placeholder="Departure"
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3 border-sky-200 dark:border-sky-800">
                        <Calendar className="h-5 w-5 text-sky-500" />
                        <Input
                          className="border-0 focus-visible:ring-0"
                          type="date"
                          placeholder="Return"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3 border-sky-200 dark:border-sky-800">
                        <Users className="h-5 w-5 text-sky-500" />
                        <Input
                          className="border-0 focus-visible:ring-0"
                          placeholder="Passengers"
                          type="number"
                          min="1"
                          max="10"
                          value={passengers}
                          onChange={(e) => setPassengers(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white" size="lg">
                      <Search className="mr-2 h-5 w-5" />
                      Search Flights
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 bg-sky-50 dark:bg-gray-900">
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
