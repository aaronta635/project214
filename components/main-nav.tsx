"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Plane } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Plane className="h-6 w-6 text-sky-500" />
        <span className="hidden font-bold sm:inline-block">FlyDreamAir</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-sky-600",
            pathname === "/" ? "text-sky-600" : "text-muted-foreground",
          )}
        >
          Home
        </Link>
      </nav>
    </div>
  )
}
