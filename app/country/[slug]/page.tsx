"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Zap, TrendingDown, DollarSign, Users, Home, Fuel } from "lucide-react"
import { countryData, type CountryKey } from "@/lib/country-data"
import { notFound, useParams } from "next/navigation"
import { LeafletMap } from "@/components/leaflet-map"
import { YearSelector } from "@/components/year-selector"

export default function CountryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [selectedYear, setSelectedYear] = useState(2030)

  if (!(slug in countryData)) {
    notFound()
  }

  const countryKey = slug as CountryKey
  const country = countryData[countryKey]

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-80 border-r border-border bg-card p-4 overflow-y-auto">
        <Card className="bg-gradient-to-br from-ciff-blue/10 to-ciff-teal/10 border-ciff-blue/20 mb-4 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Country Location</CardTitle>
            <CardDescription className="text-xs">East Africa region</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-[350px] w-full">
              <LeafletMap selectedCountry={countryKey} onCountrySelect={() => {}} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30 border-l-4 border-border shadow-md" style={{ borderLeftColor: country.color }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm" style={{ color: country.color }}>
              {country.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Population</p>
                <p className="text-base font-bold text-foreground">{country.cooking.population2030}M</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Urban HH</p>
                <p className="text-base font-bold text-foreground">
                  {(country.cooking.urbanHouseholds / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total EVs</p>
                <p className="text-base font-bold text-foreground">{(country.transport.totalEVs / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">EV Uptake</p>
                <p className="text-base font-bold text-foreground">{country.transport.evUptake}%</p>
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Net Economic Benefit</p>
              <p className="text-xl font-bold" style={{ color: country.color }}>
                $
                {(
                  country.cooking.expenseReduction +
                  country.transport.expenseReduction -
                  (country.cooking.taxReduction + country.transport.taxReduction)
                ).toFixed(1)}
                M
              </p>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-border">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Cooking Savings</span>
                <span className="font-medium text-foreground">${country.cooking.expenseReduction.toFixed(1)}M</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Transport Savings</span>
                <span className="font-medium text-foreground">${country.transport.expenseReduction.toFixed(1)}M</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Tax Impact</span>
                <span className="font-medium text-destructive">
                  -${(country.cooking.taxReduction + country.transport.taxReduction).toFixed(1)}M
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{country.name}</h1>
              <p className="text-sm text-muted-foreground">Projection for {selectedYear}</p>
            </div>
            <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} className="w-32" />
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            <Card className="bg-gradient-to-br from-ciff-blue/10 to-ciff-blue/5 border-ciff-blue/20 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Population 2030
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{country.cooking.population2030}M</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-ciff-teal/10 to-ciff-teal/5 border-ciff-teal/20 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  Total EVs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {(country.transport.totalEVs / 1000).toFixed(0)}K
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-ciff-blue/10 to-ciff-teal/5 border-ciff-blue/20 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <TrendingDown className="h-3.5 w-3.5" />
                  Tax Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  -${(country.cooking.taxReduction + country.transport.taxReduction).toFixed(1)}M
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-ciff-teal/10 to-ciff-blue/5 border-ciff-teal/20 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  Total Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" style={{ color: country.color }}>
                  ${(country.cooking.expenseReduction + country.transport.expenseReduction).toFixed(1)}M
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="cooking" className="space-y-4">
            <TabsList className="bg-muted">
              <TabsTrigger value="cooking" className="data-[state=active]:bg-background">
                <Home className="h-4 w-4 mr-2" />
                Cooking
              </TabsTrigger>
              <TabsTrigger value="transport" className="data-[state=active]:bg-background">
                <Fuel className="h-4 w-4 mr-2" />
                Transport
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cooking" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-ciff-teal/10 to-ciff-blue/5 border-ciff-teal/20 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Energy Impact</CardTitle>
                    <CardDescription className="text-xs">10% urban household transition</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={[
                          {
                            name: "Electricity",
                            value: country.cooking.electricityDemandIncrease,
                            fill: "#0078D4",
                          },
                          { name: "LPG Reduction", value: country.cooking.lpgDecrease / 200000, fill: "#ef4444" },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {[
                            {
                              name: "Electricity",
                              value: country.cooking.electricityDemandIncrease,
                              fill: "#0078D4",
                            },
                            { name: "LPG Reduction", value: country.cooking.lpgDecrease / 200000, fill: "#ef4444" },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-ciff-blue/10 to-ciff-teal/5 border-ciff-blue/20 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Fiscal Impact</CardTitle>
                    <CardDescription className="text-xs">Annual changes (millions USD)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={[
                          { name: "Tax Loss", value: -country.cooking.taxReduction, fill: "#ef4444" },
                          { name: "Savings", value: country.cooking.expenseReduction, fill: country.color },
                          {
                            name: "Net",
                            value: country.cooking.expenseReduction - country.cooking.taxReduction,
                            fill: "#0078D4",
                          },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {[
                            { name: "Tax Loss", value: -country.cooking.taxReduction, fill: "#ef4444" },
                            { name: "Savings", value: country.cooking.expenseReduction, fill: country.color },
                            {
                              name: "Net",
                              value: country.cooking.expenseReduction - country.cooking.taxReduction,
                              fill: "#0078D4",
                            },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="transport" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-ciff-blue/10 to-ciff-teal/5 border-ciff-blue/20 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">EV Adoption</CardTitle>
                    <CardDescription className="text-xs">{country.transport.evUptake}% uptake by 2030</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={[
                          {
                            name: "Total Vehicles",
                            value: country.transport.vehicleStock / 1000,
                            fill: "#6b7280",
                          },
                          { name: "EVs", value: country.transport.totalEVs / 1000, fill: country.color },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {[
                            {
                              name: "Total Vehicles",
                              value: country.transport.vehicleStock / 1000,
                              fill: "#6b7280",
                            },
                            { name: "EVs", value: country.transport.totalEVs / 1000, fill: country.color },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-ciff-teal/10 to-ciff-blue/5 border-ciff-teal/20 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Fiscal Impact</CardTitle>
                    <CardDescription className="text-xs">Annual changes (millions USD)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={[
                          { name: "Tax Loss", value: -country.transport.taxReduction, fill: "#ef4444" },
                          { name: "Fuel Savings", value: country.transport.expenseReduction, fill: country.color },
                          {
                            name: "Net",
                            value: country.transport.expenseReduction - country.transport.taxReduction,
                            fill: "#0078D4",
                          },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {[
                            { name: "Tax Loss", value: -country.transport.taxReduction, fill: "#ef4444" },
                            {
                              name: "Fuel Savings",
                              value: country.transport.expenseReduction,
                              fill: country.color,
                            },
                            {
                              name: "Net",
                              value: country.transport.expenseReduction - country.transport.taxReduction,
                              fill: "#0078D4",
                            },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
