"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Check, ChevronsUpDown, Map } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { countryData, type CountryKey } from "@/lib/country-data"
import { LeafletMap } from "@/components/leaflet-map"
import Image from "next/image"
import { YearSelector } from "@/components/year-selector"

export default function ComparativePage() {
  const [selectedCountries, setSelectedCountries] = useState<CountryKey[]>(Object.keys(countryData) as CountryKey[])
  const [open, setOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState(2030)

  const toggleCountry = (country: CountryKey) => {
    setSelectedCountries((prev) => (prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]))
  }

  const toggleAll = () => {
    if (selectedCountries.length === Object.keys(countryData).length) {
      setSelectedCountries([])
    } else {
      setSelectedCountries(Object.keys(countryData) as CountryKey[])
    }
  }

  const handleMapCountryClick = (country: CountryKey) => {
    toggleCountry(country)
  }

  const filteredData = Object.entries(countryData)
    .filter(([key]) => selectedCountries.includes(key as CountryKey))
    .map(([key, data]) => {
      const population = data.cooking.population2030
      const totalEVs = data.transport.totalEVs / 1000
      const cookingSavings = data.cooking.expenseReduction
      const transportSavings = data.transport.expenseReduction
      const cookingTaxLoss = data.cooking.taxReduction
      const transportTaxLoss = data.transport.taxReduction
      const totalTaxLoss = cookingTaxLoss + transportTaxLoss
      const netBenefit = cookingSavings + transportSavings - totalTaxLoss

      return {
        key,
        country: data.name,
        color: data.color,
        population,
        totalEVs,
        cookingSavings,
        transportSavings,
        totalTaxLoss,
        netBenefit,
        cookingTaxLoss,
        transportTaxLoss,
      }
    })

  const cookingComparisonData = filteredData.map((d) => ({
    country: d.country,
    expenseSavings: d.cookingSavings,
    taxLoss: d.cookingTaxLoss,
    color: d.color,
  }))

  const transportComparisonData = filteredData.map((d) => ({
    country: d.country,
    expenseSavings: d.transportSavings,
    taxLoss: d.transportTaxLoss,
    color: d.color,
  }))

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Comparative Analysis</h1>
          <p className="text-sm text-muted-foreground">Cross-country comparison for {selectedYear}</p>
        </div>
        <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
        <Card className="col-span-2 bg-gradient-to-br from-ciff-teal/10 to-ciff-blue/5 border-ciff-teal/20 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Net Economic Benefit</CardTitle>
            <CardDescription className="text-xs">By country (millions USD)</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="country" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="netBenefit" name="Net Benefit ($M)" fill="#0078D4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-ciff-blue/10 to-ciff-teal/10 border-ciff-blue/20 shadow-lg">
          <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-sm">Regional Map</CardTitle>
              <CardDescription className="text-xs">Select countries to compare</CardDescription>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between bg-background/50 text-xs h-7 w-32"
                >
                  {selectedCountries.length === 0
                    ? "Select..."
                    : selectedCountries.length === Object.keys(countryData).length
                      ? "All"
                      : `${selectedCountries.length}`}
                  <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="end">
                <Command>
                  <CommandInput placeholder="Search countries..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      <CommandItem onSelect={toggleAll} className="cursor-pointer">
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCountries.length === Object.keys(countryData).length ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <Map className="mr-2 h-4 w-4" />
                        <span className="font-medium">All Countries</span>
                      </CommandItem>
                      {Object.entries(countryData).map(([key, data]) => (
                        <CommandItem
                          key={key}
                          onSelect={() => toggleCountry(key as CountryKey)}
                          className="cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCountries.includes(key as CountryKey) ? "opacity-100" : "opacity-0",
                            )}
                          />
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: data.color }} />
                          {data.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-[320px] w-full">
              <LeafletMap selectedCountries={selectedCountries} onCountrySelect={handleMapCountryClick} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 relative z-20">
        <Card className="bg-gradient-to-br from-ciff-teal/10 to-ciff-blue/5 border-border shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Savings Breakdown</CardTitle>
            <CardDescription className="text-xs">Cooking vs transport by country</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="country" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="cookingSavings" name="Cooking ($M)" fill="#06b6d4" radius={[8, 8, 0, 0]} stackId="a" />
                <Bar
                  dataKey="transportSavings"
                  name="Transport ($M)"
                  fill="#0078D4"
                  radius={[8, 8, 0, 0]}
                  stackId="a"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-ciff-blue/5 to-ciff-teal/5 border-border shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">EV Adoption vs Savings</CardTitle>
            <CardDescription className="text-xs">Transport transition efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="country" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line type="monotone" dataKey="totalEVs" name="Total EVs (K)" stroke="#0078D4" strokeWidth={3} />
                <Line
                  type="monotone"
                  dataKey="transportSavings"
                  name="Transport Savings ($M)"
                  stroke="#06b6d4"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 relative z-20">
        <Card className="bg-gradient-to-br from-ciff-blue/5 to-ciff-teal/5 border-border shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cooking Sector Comparison</CardTitle>
            <CardDescription className="text-xs">Expense savings vs tax impact</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cookingComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="country" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="expenseSavings" name="Savings ($M)" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                <Bar dataKey="taxLoss" name="Tax Loss ($M)" fill="#dc2626" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-ciff-teal/5 to-ciff-blue/5 border-border shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Transport Sector Comparison</CardTitle>
            <CardDescription className="text-xs">Fuel savings vs tax impact</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={transportComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="country" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="expenseSavings" name="Savings ($M)" fill="#0078D4" radius={[8, 8, 0, 0]} />
                <Bar dataKey="taxLoss" name="Tax Loss ($M)" fill="#dc2626" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 relative z-20">
        <Card className="bg-gradient-to-br from-ciff-blue/5 to-ciff-teal/5 border-ciff-blue/20 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Regional Trend Analysis (1960-2100)</CardTitle>
            <CardDescription className="text-xs">
              Historical data and projections for urbanization, electrification, and population growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-card border-border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Electrification Rate Trends</CardTitle>
                  <CardDescription className="text-[10px]">Urban vs rural electrification rates</CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="relative w-full h-[200px]">
                    <Image
                      src="/electrification-rate-comparison.png"
                      alt="Electrification rate comparison showing urban and rural trends"
                      fill
                      className="object-contain"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Population Growth Projections</CardTitle>
                  <CardDescription className="text-[10px]">
                    Historical and future projections in millions
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="relative w-full h-[200px]">
                    <Image
                      src="/population-comparison.png"
                      alt="Population comparison showing historical data and projections"
                      fill
                      className="object-contain"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Urban Share Projections</CardTitle>
                  <CardDescription className="text-[10px]">Percentage of population in urban areas</CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="relative w-full h-[200px]">
                    <Image
                      src="/urban-share-comparison.png"
                      alt="Urban share comparison showing historical data and projections"
                      fill
                      className="object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
