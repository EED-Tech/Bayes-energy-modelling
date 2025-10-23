"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Target, CheckCircle2, TrendingUp } from "lucide-react"
import { countryData, type CountryKey } from "@/lib/country-data"
import { LeafletMap } from "@/components/leaflet-map"
import { YearSelector } from "@/components/year-selector"

export default function OverviewPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryKey>("ethiopia")
  const [selectedYear, setSelectedYear] = useState(2030)

  const netImpactData = Object.entries(countryData).map(([key, data]) => ({
    country: data.name,
    netSavings:
      data.cooking.expenseReduction +
      data.transport.expenseReduction -
      (data.cooking.taxReduction + data.transport.taxReduction),
    color: data.color,
  }))

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Simulation Overview </h1>
          <p className="text-sm text-muted-foreground">Projected modeling for Kenya, Uganda, Tanzania, Ehiopia and Malawi     </p>
        </div>
        <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6 relative z-10">
        <Card className="col-span-2 bg-gradient-to-br from-ciff-teal/20 via-ciff-blue/15 to-ciff-teal/10 border-ciff-teal/40 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Simulation of Energy Transition </CardTitle>
            <CardDescription>Modeling cooking and transport electrification pathways to {selectedYear}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-[#0078D4]" />
                Project Objectives
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This dashboard analyzes the economic and fiscal impacts of transitioning to electric cooking and
                transport in five East African countries: Kenya, Ethiopia, Malawi, Tanzania, and Uganda. The analysis
                models scenarios where urban households shift from LPG to electric cooking, and various levels of
                electric vehicle adoption are achieved by {selectedYear}.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#4A9EDA]" />
                What Was Done
              </h3>
              <ul className="text-sm text-muted-foreground leading-relaxed space-y-1 list-disc list-inside">
                <li>Modeled 10% urban household transition from LPG to electric cooking by {selectedYear}</li>
                <li>Analyzed EV adoption scenarios ranging from 5% to 50% by country</li>
                <li>Calculated household expense reductions and government tax revenue impacts</li>
                <li>Assessed net economic benefits across all five countries</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#6CB4E8]" />
                Key Expectations
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The analysis reveals that all countries show positive net economic impacts despite reduced fuel tax
                revenues. Household savings from lower energy costs significantly outweigh government revenue losses,
                suggesting that electrification policies can deliver broad economic benefits while supporting climate
                goals.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-ciff-blue/5 to-ciff-teal/5 border-border shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Regional Map</CardTitle>
            <CardDescription className="text-xs">Click on a country to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <LeafletMap selectedCountry={selectedCountry} onCountrySelect={setSelectedCountry} showAllEqual={true} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-ciff-blue/5 to-ciff-teal/5 border-border mb-6 relative z-20 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Regional Overview</CardTitle>
          <CardDescription className="text-xs">Net economic benefit by country (millions USD)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={netImpactData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="country" type="category" stroke="hsl(var(--muted-foreground))" width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="netSavings" name="Net Benefit ($M)" radius={[0, 8, 8, 0]}>
                {netImpactData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill= {entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4 relative z-20">
        <Card className="bg-gradient-to-br from-ciff-teal/10 to-ciff-teal/5 border-ciff-teal/20 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cooking Finding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-foreground leading-relaxed">
              All countries show positive net impact, with savings of $4.6M-$35.8M annually.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-ciff-blue/10 to-ciff-blue/5 border-ciff-blue/20 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transport Finding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-foreground leading-relaxed">
              Ethiopia leads with $1.65B savings at 50% uptake; others achieve $68M-$600M at 5%.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-ciff-teal/10 to-ciff-blue/5 border-ciff-teal/20 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Policy Implication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-foreground leading-relaxed">
              Net positive outcomes suggest tax adjustments offset by economic benefits.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
