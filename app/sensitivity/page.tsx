"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { countryData, type CountryKey } from "@/lib/country-data"

export default function SensitivityPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryKey>("ethiopia")
  const [fuelTaxRate, setFuelTaxRate] = useState(35)
  const [electricityTaxRate, setElectricityTaxRate] = useState(16)
  const [evAdoptionRate, setEvAdoptionRate] = useState(50)
  const [eCookingAdoptionRate, setECookingAdoptionRate] = useState(50)
  const [carbonPrice, setCarbonPrice] = useState(10)

  const country = countryData[selectedCountry]

  // Calculate sensitivity metrics based on adjustable parameters
  const calculateMetrics = () => {
    const baselineFuelTax = country.transport.fuelTax
    const baselineElectricityTax = country.transport.electricityTax
    const baselineEVs = country.transport.totalEVs

    // Fossil fuel tax revenue (decreases with EV adoption)
    const fuelTaxRevenue =
      (((country.transport.vehicleStock * (100 - evAdoptionRate)) / 100) * (fuelTaxRate / 100) * 1200) / 1000000

    // Forex exposure from fuel imports (decreases with EV adoption)
    const forexExposure = (((country.transport.vehicleStock * (100 - evAdoptionRate)) / 100) * 1.5 * 1200) / 1000000

    // Electricity sales revenue (increases with adoption)
    const electricitySales =
      (((country.transport.vehicleStock * evAdoptionRate) / 100) * 3000 * 0.15 +
        ((country.cooking.urbanHouseholds * eCookingAdoptionRate) / 100) * 500 * 0.15) /
      1000000

    // Electricity tax revenue
    const electricityTaxRevenue = electricitySales * (electricityTaxRate / 100)

    // Government net position
    const govNetPosition = electricityTaxRevenue - fuelTaxRevenue * 0.7 + carbonPrice * evAdoptionRate * 0.5

    // Sector net position (consumer savings minus government loss)
    const consumerSavings =
      (country.transport.expenseReduction * evAdoptionRate) / 50 +
      (country.cooking.expenseReduction * eCookingAdoptionRate) / 50
    const sectorNetPosition = consumerSavings - Math.abs(govNetPosition)

    // Deemed charges (subsidies/support needed)
    const deemedCharges = Math.max(0, -govNetPosition * 0.3)

    // Co-benefits (health and environment)
    const healthBenefits = ((evAdoptionRate + eCookingAdoptionRate) / 2) * 0.8
    const environmentBenefits = ((evAdoptionRate + eCookingAdoptionRate) / 2) * 1.2

    // Carbon finance potential
    const carbonFinance =
      ((evAdoptionRate * country.transport.vehicleStock * 2.5 +
        eCookingAdoptionRate * country.cooking.urbanHouseholds * 0.5) *
        carbonPrice) /
      1000000

    return {
      fuelTaxRevenue,
      forexExposure,
      electricitySales,
      electricityTaxRevenue,
      govNetPosition,
      sectorNetPosition,
      deemedCharges,
      healthBenefits,
      environmentBenefits,
      carbonFinance,
      consumerSavings,
    }
  }

  const metrics = calculateMetrics()

  // Waterfall data for government revenue
  const waterfallData = [
    { name: "Fuel Tax Loss", value: -metrics.fuelTaxRevenue, cumulative: -metrics.fuelTaxRevenue },
    {
      name: "Electricity Tax Gain",
      value: metrics.electricityTaxRevenue,
      cumulative: -metrics.fuelTaxRevenue + metrics.electricityTaxRevenue,
    },
    {
      name: "Carbon Finance",
      value: metrics.carbonFinance,
      cumulative: -metrics.fuelTaxRevenue + metrics.electricityTaxRevenue + metrics.carbonFinance,
    },
    { name: "Net Position", value: metrics.govNetPosition, cumulative: metrics.govNetPosition },
  ]

  // Sensitivity tornado chart data
  const sensitivityData = [
    { parameter: "EV Adoption", impact: Math.abs(metrics.govNetPosition * 0.4) },
    { parameter: "Fuel Tax Rate", impact: Math.abs(metrics.govNetPosition * 0.3) },
    { parameter: "Electricity Tax", impact: Math.abs(metrics.govNetPosition * 0.15) },
    { parameter: "Carbon Price", impact: Math.abs(metrics.carbonFinance * 0.8) },
    { parameter: "E-Cooking Adoption", impact: Math.abs(metrics.govNetPosition * 0.15) },
  ].sort((a, b) => b.impact - a.impact)

  // Co-benefits data
  const coBenefitsData = [
    { category: "Health Benefits", value: metrics.healthBenefits },
    { category: "Environment", value: metrics.environmentBenefits },
    { category: "Carbon Finance", value: metrics.carbonFinance },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sensitivity Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Explore how different policy parameters affect fiscal and economic outcomes
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue="parameters">
        <AccordionItem value="parameters">
          <AccordionTrigger className="hover:no-underline">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Sensitivity Parameters</CardTitle>
                <CardDescription>Adjust parameters to see their impact on outcomes</CardDescription>
              </CardHeader>
            </Card>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select value={selectedCountry} onValueChange={(value) => setSelectedCountry(value as CountryKey)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(countryData).map(([key, data]) => (
                          <SelectItem key={key} value={key}>
                            {data.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>EV Adoption Rate: {evAdoptionRate}%</Label>
                    <Slider
                      value={[evAdoptionRate]}
                      onValueChange={(value) => setEvAdoptionRate(value[0])}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>E-Cooking Adoption Rate: {eCookingAdoptionRate}%</Label>
                    <Slider
                      value={[eCookingAdoptionRate]}
                      onValueChange={(value) => setECookingAdoptionRate(value[0])}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Fuel Tax Rate: {fuelTaxRate}%</Label>
                    <Slider
                      value={[fuelTaxRate]}
                      onValueChange={(value) => setFuelTaxRate(value[0])}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Electricity Tax Rate: {electricityTaxRate}%</Label>
                    <Slider
                      value={[electricityTaxRate]}
                      onValueChange={(value) => setElectricityTaxRate(value[0])}
                      min={0}
                      max={50}
                      step={2}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Carbon Price: ${carbonPrice}/tCO2</Label>
                    <Slider
                      value={[carbonPrice]}
                      onValueChange={(value) => setCarbonPrice(value[0])}
                      min={0}
                      max={50}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Tabs defaultValue="fiscal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fiscal" className="data-[state=active]:bg-[#0078D4] data-[state=active]:text-white">
            Fiscal Impact
          </TabsTrigger>
          <TabsTrigger value="sensitivity" className="data-[state=active]:bg-[#0078D4] data-[state=active]:text-white">
            Sensitivity Analysis
          </TabsTrigger>
          <TabsTrigger value="cobenefits" className="data-[state=active]:bg-[#0078D4] data-[state=active]:text-white">
            Co-Benefits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fiscal" className="space-y-4">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Fuel Tax Revenue Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">-${metrics.fuelTaxRevenue.toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground mt-1">Annual revenue impact</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Forex Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0078D4]">${metrics.forexExposure.toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground mt-1">Reduced fuel imports</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Electricity Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#06b6d4]">${metrics.electricitySales.toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground mt-1">New sales + taxes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Government Net Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${metrics.govNetPosition >= 0 ? "text-[#0078D4]" : "text-red-600"}`}
                >
                  {metrics.govNetPosition >= 0 ? "+" : ""}${metrics.govNetPosition.toFixed(1)}M
                </div>
                <p className="text-xs text-muted-foreground mt-1">Annual fiscal impact</p>
              </CardContent>
            </Card>
          </div>

          {/* Waterfall Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Government Revenue </CardTitle>
              <CardDescription>Breakdown of fiscal impacts from energy transition</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: { label: "Impact (M USD)", color: "#0078D4" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waterfallData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {waterfallData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.value >= 0 ? "#0078D4" : "#dc2626"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Sector Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sector Net Position</CardTitle>
                <CardDescription>Consumer savings vs government fiscal impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Consumer Savings</span>
                      <span className="text-sm font-bold text-[#0078D4]">${metrics.consumerSavings.toFixed(1)}M</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0078D4]" style={{ width: "100%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Government Impact</span>
                      <span
                        className={`text-sm font-bold ${metrics.govNetPosition >= 0 ? "text-[#0078D4]" : "text-red-600"}`}
                      >
                        ${Math.abs(metrics.govNetPosition).toFixed(1)}M
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${metrics.govNetPosition >= 0 ? "bg-[#0078D4]" : "bg-red-600"}`}
                        style={{
                          width: `${Math.min(100, (Math.abs(metrics.govNetPosition) / metrics.consumerSavings) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="font-medium">Net Sector Benefit</span>
                      <span className="font-bold text-[#0078D4]">${metrics.sectorNetPosition.toFixed(1)}M</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deemed Charges</CardTitle>
                <CardDescription>Government support required for transition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center py-8">${metrics.deemedCharges.toFixed(1)}M</div>
                <p className="text-sm text-muted-foreground text-center">
                  Annual subsidies or support mechanisms needed to offset fiscal gaps
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sensitivity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parameter Sensitivity</CardTitle>
              <CardDescription>Impact of each parameter on government net position</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  impact: { label: "Impact (M USD)", color: "#0078D4" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sensitivityData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="parameter" type="category" width={150} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="impact" fill="#0078D4" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scenario Comparison</CardTitle>
              <CardDescription>Government net position under different adoption scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  netPosition: { label: "Net Position (M USD)", color: "#0078D4" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { adoption: 0, netPosition: 0 },
                      { adoption: 25, netPosition: metrics.govNetPosition * 0.5 },
                      { adoption: 50, netPosition: metrics.govNetPosition },
                      { adoption: 75, netPosition: metrics.govNetPosition * 1.3 },
                      { adoption: 100, netPosition: metrics.govNetPosition * 1.5 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="adoption"
                      label={{ value: "Adoption Rate (%)", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis label={{ value: "Net Position (M USD)", angle: -90, position: "insideLeft" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="netPosition" stroke="#0078D4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cobenefits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Co-Benefits Analysis</CardTitle>
              <CardDescription>Health, environmental, and carbon finance benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: { label: "Benefit Value (M USD)", color: "#0078D4" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={coBenefitsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      <Cell fill="#0078D4" />
                      <Cell fill="#06b6d4" />
                      <Cell fill="#10b981" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Health Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0078D4]">${metrics.healthBenefits.toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground mt-1">Reduced air pollution and respiratory diseases</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Environmental Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#06b6d4]">${metrics.environmentBenefits.toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground mt-1">CO2 reduction and ecosystem preservation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Carbon Finance Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#10b981]">${metrics.carbonFinance.toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground mt-1">Revenue from carbon credits at ${carbonPrice}/tCO2</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
