"use client"

import React, { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ArrowRight, Check, Info } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SeatsPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const fromLocation = searchParams.get("from") || ""
  const toLocation = searchParams.get("to") || ""
  const departureDate = searchParams.get("departure") || ""
  const flightPrice = searchParams.get("price") || "0"
  const passengerCount = Number(searchParams.get("passengers") || "1")

  // Format the departure date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [seatPrices, setSeatPrices] = useState<Record<string, number>>({})

  // Calculate total price
  const basePrice = Number.parseInt(flightPrice)
  const seatSelectionPrice = Object.values(seatPrices).reduce((sum, price) => sum + price, 0)
  const totalPrice = basePrice + seatSelectionPrice

  // Handle seat selection
  const toggleSeatSelection = (seat: string, price: number) => {
    if (selectedSeats.includes(seat)) {
      // Remove seat if already selected
      setSelectedSeats(selectedSeats.filter((s) => s !== seat))
      setSeatPrices((prev) => {
        const newPrices = { ...prev }
        delete newPrices[seat]
        return newPrices
      })
    } else if (selectedSeats.length < passengerCount) {
      // Add seat only if we haven't reached the passenger limit
      setSelectedSeats([...selectedSeats, seat])
      setSeatPrices((prev) => ({ ...prev, [seat]: price }))
    } else {
      // If we're at the limit, show an alert
      alert(
        `You can only select ${passengerCount} seat${passengerCount !== 1 ? "s" : ""} for ${passengerCount} passenger${passengerCount !== 1 ? "s" : ""}.`,
      )
    }
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
            <h1 className="text-3xl font-bold mb-2 text-sky-700 dark:text-sky-300">Select Your Seats</h1>
            <p className="text-muted-foreground">
              Flight {params.id} · {fromLocation} to {toLocation} · {formatDate(departureDate)}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 max-w-6xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Seat Selection</CardTitle>
                <CardDescription>Choose your preferred seats for your flight</CardDescription>
                {passengerCount > 1 && (
                  <div className="mt-2 p-2 bg-sky-50 dark:bg-sky-900/30 rounded-md text-sm">
                    Please select {passengerCount} seat{passengerCount !== 1 ? "s" : ""} for your booking.
                    <div className="font-medium mt-1">
                      Selected: {selectedSeats.length} of {passengerCount}
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <TooltipProvider>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full max-w-md mx-auto">
                      <div className="flex justify-center mb-6">
                        <div className="px-4 py-2 bg-sky-600 text-white rounded-lg">Front of Aircraft</div>
                      </div>

                      <div className="grid grid-cols-6 gap-2 mb-8">
                        {/* First Class */}
                        <div className="col-span-6 text-center text-sm font-medium mb-2">First Class</div>
                        {[1, 2, 3].map((row) => (
                          <React.Fragment key={row}>
                            <div className="text-xs text-center">{row}</div>
                            {["A", "B", "C", "D", "E"].map((seat) => {
                              const seatId = `${row}${seat}`
                              const isSelected = selectedSeats.includes(seatId)

                              return (
                                <Tooltip key={seatId}>
                                  <TooltipTrigger asChild>
                                    <button
                                      onClick={() => toggleSeatSelection(seatId, row === 1 ? 50 : 40)}
                                      className={`w-8 h-8 rounded-md flex items-center justify-center text-xs 
                                      ${isSelected ? "bg-sky-600 text-white" : "bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-900 dark:text-sky-100"}`}
                                    >
                                      {isSelected ? <Check className="h-4 w-4" /> : seatId}
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="text-sm">
                                      <p>Seat {seatId}</p>
                                      <p className="font-medium">${row === 1 ? "50" : "40"} extra</p>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              )
                            })}
                          </React.Fragment>
                        ))}

                        <Separator className="col-span-6 my-4" />

                        {/* Economy */}
                        <div className="col-span-6 text-center text-sm font-medium mb-2">Economy</div>
                        {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((row) => (
                          <React.Fragment key={row}>
                            <div className="text-xs text-center">{row}</div>
                            {["A", "B", "C", "D", "E"].map((seat) => {
                              const seatId = `${row}${seat}`
                              const isSelected = selectedSeats.includes(seatId)
                              const isUnavailable =
                                (row === 12 && (seat === "A" || seat === "B")) ||
                                (row === 15 && (seat === "D" || seat === "E"))

                              return (
                                <Tooltip key={seatId}>
                                  <TooltipTrigger asChild>
                                    <button
                                      disabled={isUnavailable}
                                      onClick={() => !isUnavailable && toggleSeatSelection(seatId, row < 15 ? 15 : 0)}
                                      className={`w-8 h-8 rounded-md flex items-center justify-center text-xs 
                                      ${
                                        isSelected
                                          ? "bg-sky-600 text-white"
                                          : isUnavailable
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700"
                                            : "bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-900 dark:text-sky-100"
                                      }`}
                                    >
                                      {isSelected ? <Check className="h-4 w-4" /> : seatId}
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {isUnavailable ? (
                                      <p>Seat unavailable</p>
                                    ) : (
                                      <div className="text-sm">
                                        <p>Seat {seatId}</p>
                                        <p className="font-medium">{row < 15 ? "$15 extra" : "No extra charge"}</p>
                                      </div>
                                    )}
                                  </TooltipContent>
                                </Tooltip>
                              )
                            })}
                          </React.Fragment>
                        ))}
                      </div>

                      <div className="flex justify-center">
                        <div className="px-4 py-2 bg-sky-600 text-white rounded-lg">Back of Aircraft</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-4 h-4 mr-2 rounded-sm bg-sky-100 dark:bg-sky-900"></div>
                        <span>First Class ($40-50)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 mr-2 rounded-sm bg-sky-100 dark:bg-sky-900"></div>
                        <span>Economy</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 mr-2 rounded-sm bg-sky-600"></div>
                        <span>Selected</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 mr-2 rounded-sm bg-gray-300 dark:bg-gray-700"></div>
                        <span>Unavailable</span>
                      </div>
                    </div>
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>

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
                      {selectedSeats.length === 0 && (
                        <div className="text-sm text-muted-foreground">No seats selected</div>
                      )}
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Base fare</span>
                    <span>${basePrice}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seat selection</span>
                    <span>${seatSelectionPrice}.00</span>
                  </div>
                  {selectedSeats.length > 0 && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Info className="h-4 w-4 mr-1" />
                      <span>
                        {Object.entries(seatPrices).map(([seat, price], index, arr) => (
                          <React.Fragment key={seat}>
                            Seat {seat}: ${price}
                            {index < arr.length - 1 ? ", " : ""}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totalPrice}.00</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link
                    href={`/flights/${params.id}/services?from=${encodeURIComponent(fromLocation)}&to=${encodeURIComponent(toLocation)}&departure=${encodeURIComponent(departureDate)}&price=${basePrice}&seats=${selectedSeats.join(",")}&seatPrice=${seatSelectionPrice}&passengers=${passengerCount}`}
                    className="w-full"
                  >
                    <Button
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                      disabled={selectedSeats.length === 0 || selectedSeats.length !== passengerCount}
                    >
                      Continue to Services
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
