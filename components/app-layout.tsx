"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Info, BarChart3, FileText, Sliders } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { href: "/", label: "Overview", icon: Info },
  { href: "/comparative", label: "All Countries", icon: BarChart3 },
  { href: "/sensitivity", label: "Sensitivity Analysis", icon: Sliders },
  { href: "/assumptions", label: "Assumptions", icon: FileText },
]

const countryItems = [
  { href: "/country/ethiopia", label: "Ethiopia" },
  { href: "/country/kenya", label: "Kenya" },
  { href: "/country/uganda", label: "Uganda" },
  { href: "/country/malawi", label: "Malawi" },
  { href: "/country/tanzania", label: "Tanzania" },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="border-b border-border bg-gradient-to-r from-ciff-teal/20 via-ciff-blue/15 to-ciff-teal/10 sticky top-0 z-50 shadow-md">
        <div className="px-6 py-4 text-chart-5 opacity-100 bg-chart-3">
          <div className="mb-3">
            <h1 className="text-2xl font-bold text-background">
              Economic Pathways to Budget-Neutral Energy Transitions: Simulation of Energy Transition Scenarios
            </h1>
            <p className="text-sm mt-1 text-background">
              E - Cooking and E - Mobility electrification modeling 2025 to 2030
            </p>
          </div>

          {/* Country Navigation */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium mr-3 text-background">Country specific results:</span>
            {countryItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-background hover:text-foreground hover:bg-accent hover:shadow-sm",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </header>

      {/* Main Layout with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-56 border-r border-border bg-gradient-to-b from-ciff-blue/10 to-ciff-teal/5 flex-shrink-0 shadow-md">
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-all",
                    isActive
                      ? "bg-gradient-to-r from-ciff-teal to-ciff-blue text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-ciff-teal/20 hover:to-ciff-blue/20 hover:shadow-md",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
