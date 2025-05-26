"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ArrowRight, Check, CreditCard, Plane } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const fromLocation = searchParams.get("from") || ""
  const toLocation = searchParams.get("to") || ""
  const departureDate = searchParams.get("departure") || ""
  const totalPrice = searchParams.get("total") || "0"

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Format the departure date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
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
            <h1 className="text-3xl font-bold mb-2 text-sky-700 dark:text-sky-300">Checkout</h1>
            <p className="text-muted-foreground">
              Flight {params.id} · {fromLocation} to {toLocation} · {formatDate(departureDate)}
            </p>
          </div>

          {isSuccess ? (
            <Card className="max-w-3xl mx-auto">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Your flight has been successfully booked. A confirmation email has been sent to your email address.
                  </p>
                  <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-lg mb-6 w-full max-w-md">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Booking Reference:</span>
                      <span className="font-bold">{params.id.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Flight:</span>
                      <span>
                        {fromLocation} to {toLocation}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Date:</span>
                      <span>{formatDate(departureDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Total Paid:</span>
                      <span className="font-bold">${totalPrice}</span>
                    </div>
                  </div>
                  <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white">
                    <Link href="/">
                      <Plane className="mr-2 h-4 w-4" />
                      Book Another Flight
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 max-w-6xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Complete your booking by providing payment details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="payment-method">Payment Method</Label>
                        <RadioGroup
                          id="payment-method"
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                          className="grid grid-cols-3 gap-4 mt-2"
                        >
                          <div>
                            <RadioGroupItem value="credit-card" id="credit-card" className="peer sr-only" />
                            <Label
                              htmlFor="credit-card"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-sky-600 [&:has([data-state=checked])]:border-sky-600"
                            >
                              <CreditCard className="mb-3 h-6 w-6" />
                              <span className="text-sm font-medium">Credit Card</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                            <Label
                              htmlFor="paypal"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-sky-600 [&:has([data-state=checked])]:border-sky-600"
                            >
                              <svg
                                className="mb-3 h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.4 3H16.2C17.1 3 17.9 3.3 18.5 3.9C19.1 4.5 19.3 5.3 19.2 6.3C18.8 10.2 16.1 12 12.7 12H9.7C9.2 12 8.8 12.4 8.7 12.9L7.6 19.7C7.5 20.1 7.2 20.4 6.8 20.4H3.5C3 20.4 2.6 19.9 2.7 19.4L5.5 3.9C5.6 3.4 6 3 7.4 3Z"
                                  fill="#0070BA"
                                />
                                <path
                                  d="M19.5 7H21.4C21.9 7 22.3 7.5 22.2 8L19.9 19.7C19.8 20.1 19.5 20.4 19.1 20.4H16.5C16 20.4 15.6 19.9 15.7 19.4L16.7 13.9C16.8 13.4 17.2 13 17.7 13H19.1C20 13 20.8 12.7 21.4 12.1C22 11.5 22.2 10.7 22.1 9.7C22 8.2 20.9 7 19.5 7Z"
                                  fill="#003087"
                                />
                              </svg>
                              <span className="text-sm font-medium">PayPal</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="apple-pay" id="apple-pay" className="peer sr-only" />
                            <Label
                              htmlFor="apple-pay"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-sky-600 [&:has([data-state=checked])]:border-sky-600"
                            >
                              <svg
                                className="mb-3 h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.25 4C6.25 2.48 7.48 1.25 9 1.25C10.52 1.25 11.75 2.48 11.75 4C11.75 5.52 10.52 6.75 9 6.75C7.48 6.75 6.25 5.52 6.25 4Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M17.75 4C17.75 5.52 16.52 6.75 15 6.75C13.48 6.75 12.25 5.52 12.25 4C12.25 2.48 13.48 1.25 15 1.25C16.52 1.25 17.75 2.48 17.75 4Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M4.25 9C4.25 7.48 5.48 6.25 7 6.25H11C12.52 6.25 13.75 7.48 13.75 9V17C13.75 18.52 12.52 19.75 11 19.75H7C5.48 19.75 4.25 18.52 4.25 17V9Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M15.75 9C15.75 7.48 16.98 6.25 18.5 6.25H19C20.52 6.25 21.75 7.48 21.75 9V17C21.75 18.52 20.52 19.75 19 19.75H18.5C16.98 19.75 15.75 18.52 15.75 17V9Z"
                                  fill="currentColor"
                                />
                              </svg>
                              <span className="text-sm font-medium">Apple Pay</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {paymentMethod === "credit-card" && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <Label htmlFor="card-name">Name on Card</Label>
                              <Input id="card-name" placeholder="John Doe" required />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                            </div>
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" required />
                            </div>
                            <div>
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" required />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Billing Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" placeholder="123 Main St" required />
                          </div>
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="New York" required />
                          </div>
                          <div>
                            <Label htmlFor="postal-code">Postal Code</Label>
                            <Input id="postal-code" placeholder="10001" required />
                          </div>
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input id="state" placeholder="NY" required />
                          </div>
                          <div>
                            <Label htmlFor="country">Country</Label>
                            <Select defaultValue="us">
                              <SelectTrigger id="country">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="ca">Canada</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="au">Australia</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Complete Booking
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div>
                <Card className="sticky top-24">
                  <CardHeader className="text-center">
                    <CardTitle>Booking Summary</CardTitle>
                    <CardDescription>Flight {params.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Flight</span>
                        <span>
                          {fromLocation} to {toLocation}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Date</span>
                        <span>{formatDate(departureDate)}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      By completing this booking, you agree to our Terms and Conditions and Privacy Policy.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
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
