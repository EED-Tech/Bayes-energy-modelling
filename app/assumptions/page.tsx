"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DollarSign, TrendingDown, Zap, Flame, Car, ChefHat, Battery, Receipt, Gift, FileText } from "lucide-react"
import { countryData, type CountryKey } from "@/lib/country-data"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AssumptionsPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryKey>("ethiopia")
  const country = countryData[selectedCountry]

  const formatNumber = (value: number | undefined, decimals = 2, fallback = 0): string => {
    return (value ?? fallback).toFixed(decimals)
  }

  const eCookingTaxIntersections = [
    {
      asset: "Appliance",
      stage: "Import",
      taxes: [
        "Import Duty",
        "Excise Duty (Appliance specific)",
        "Import Declaration Fees",
        "Railway Development Levy",
        "VAT on Import",
        "Other Import Fees (surtax, withholding, etc.)",
      ],
    },
    {
      asset: "Appliance",
      stage: "Registration",
      taxes: ["To be determined"],
    },
    {
      asset: "Appliance",
      stage: "Annual usage",
      taxes: ["To be determined"],
    },
    {
      asset: "Appliance",
      stage: "Resale",
      taxes: ["VAT on Local Sale (if applicable)", "Stamp Duty (if applicable)"],
    },
    {
      asset: "Appliance",
      stage: "Disposal",
      taxes: [
        "Environmental Fees / Extended Producer Responsibility (EPR)",
        "Cess tax on scrap metal parts",
        "Specific Battery/Waste Fees (EVs)",
      ],
    },
    {
      asset: "Energy",
      stage: "Import",
      taxes: [
        "Import Duty",
        "Excise Duty (vehicle specific)",
        "Import Declaration Fees",
        "Railway Development Levy",
        "VAT on Import",
        "Other Import Fees (surtax, withholding, etc.)",
      ],
    },
    {
      asset: "Energy",
      stage: "Transportation",
      taxes: ["VAT on Fuel", "Charcoal Movement Permit (per 90kg bag)", "Charcoal Export Permit (per tonne)"],
    },
    {
      asset: "Energy",
      stage: "Consumption",
      taxes: [
        "Road Development Levy (RDL)",
        "Charcoal Production License (Annual)",
        "Monthly Fuel Licence (MFL) - forest products",
        "Fuel energy cost",
        "Customs duty",
        "VAT",
        "Petroleum Development Levy (PDL)",
        "Lifeline or Cooking Tariff (Fumba Tariff)",
        "Water levy",
        "Inflation adjustment",
        "Rural Electrification Programme (REP)",
        "EPRA levy",
        "Foreign Exchange Rate Fluctuation Adjustment",
      ],
    },
  ]

  const eMobilityTaxIntersections = [
    {
      asset: "Vehicle",
      stage: "Import",
      taxes: [
        "Import Duty",
        "Excise Duty (vehicle specific)",
        "Import Declaration Fees",
        "Withholding Tax",
        "Environmental Levy",
        "Infrastructural levy",
        "Railway Development Levy",
        "HIV Response Levy",
        "VAT on Import",
      ],
    },
    {
      asset: "Vehicle",
      stage: "Registration",
      taxes: [
        "Registration Fees",
        "Number Plates",
        "Annual Road Licence/Inspection",
        "Annual Insurance Taxes / Stamp Duties",
        "Capital Allowances (tax incentive)",
      ],
    },
    {
      asset: "Vehicle",
      stage: "Resale",
      taxes: ["VAT on Local Sale (Transfer Fees)"],
    },
    {
      asset: "Vehicle",
      stage: "Disposal",
      taxes: ["Environmental Fees / EPR", "Specific Battery / Waste Fees (EVs)"],
    },
    {
      asset: "Energy",
      stage: "Import",
      taxes: [
        "Excise on Fuel Imports",
        "VAT on Fuel",
        "Landed costs",
        "Distribution and storage costs",
        "OMC Margins",
        "Taxes and Levies",
        "Petroleum Development Levy",
      ],
    },
    {
      asset: "Energy",
      stage: "Consumption",
      taxes: [
        "Fuel Energy Charge",
        "VAT (electricity)",
        "Water levy (electricity)",
        "Rural Electrification Programme (REP)",
        "Regulator's levy",
        "Inflation adjustment",
        "Foreign Exchange Rate Fluctuation Adjustment",
      ],
    },
  ]

  const countrySources = {
    kenya: { name: "Kenya", source: "Finance Act 2023", url: "https://kra.go.ke" },
    uganda: { name: "Uganda", source: "URA Excise Tariff Guide 2023", url: "https://ura.go.ug" },
    tanzania: { name: "Tanzania", source: "Finance Act 2025", url: "https://tra.go.tz" },
    ethiopia: { name: "Ethiopia", source: "VAT Proclamation No 285", url: "#" },
    malawi: { name: "Malawi", source: "MRA Tax Incentives 2022", url: "https://mra.mw" },
  }

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">Country-Specific Assumptions</h1>
        <p className="text-sm text-muted-foreground mb-3">
          Select a country to view detailed assumptions and parameters
        </p>
        <div className="flex gap-2">
          {Object.entries(countryData).map(([key, data]) => (
            <Button
              key={key}
              variant={selectedCountry === key ? "default" : "outline"}
              onClick={() => setSelectedCountry(key as CountryKey)}
              className="flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
              {data.name}
            </Button>
          ))}
        </div>
      </div>

      <Accordion type="single" collapsible defaultValue="methodology" className="mb-4">
        <AccordionItem
          value="methodology"
          className="border rounded-lg bg-gradient-to-br from-ciff-teal/10 to-ciff-blue/5 border-ciff-teal/30"
        >
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-ciff-teal" />
              <span className="font-semibold">Methodology for {country.name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Three-step approach: data sourcing, forecasting, and economic impact modeling for {country.name}'s energy
              transitions.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-gradient-to-br from-ciff-teal/20 to-ciff-teal/10 border-ciff-teal/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs">Data Sourcing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    World Bank, IEA, national statistics on population, energy, and transport.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-ciff-blue/20 to-ciff-blue/10 border-ciff-blue/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs">Forecasting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Logistic and linear models project variables to 2030 and 2100.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-ciff-teal/15 to-ciff-blue/15 border-ciff-blue/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs">Impact Modeling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Calculate fiscal impacts accounting for tax differentials and costs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Tabs defaultValue="cooking" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger
            value="cooking"
            className="flex items-center gap-2 data-[state=active]:bg-ciff-blue data-[state=active]:text-white"
          >
            <ChefHat className="h-4 w-4" />
            E-Cooking
          </TabsTrigger>
          <TabsTrigger
            value="mobility"
            className="flex items-center gap-2 data-[state=active]:bg-ciff-blue data-[state=active]:text-white"
          >
            <Car className="h-4 w-4" />
            E-Mobility
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cooking" className="space-y-4">
          <Card className="bg-gradient-to-br from-ciff-blue/15 to-ciff-teal/10 border-ciff-blue/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-ciff-blue" />
                E-Cooking Energy Assumptions - {country.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-ciff-blue" />
                    General Parameters
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                      <span className="text-muted-foreground">Population (2030)</span>
                      <span className="text-foreground font-medium">
                        {formatNumber((country.cooking.population2030 ?? 0) / 1000000, 1)}M
                      </span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                      <span className="text-muted-foreground">Urban Households</span>
                      <span className="text-foreground font-medium">
                        {formatNumber((country.cooking.urbanHouseholds2030 ?? 0) / 1000, 0)}K
                      </span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                      <span className="text-muted-foreground">Transition Target</span>
                      <span className="text-foreground font-medium">10% urban HH by 2030</span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                      <span className="text-muted-foreground">Electric Demand</span>
                      <span className="text-foreground font-medium">600 kWh/HH/year</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-ciff-blue" />
                    Pricing & Fiscal Policy
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        LPG Price
                      </span>
                      <span className="text-foreground font-medium">${formatNumber(country.cooking.lpgPrice)}/kg</span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        Electricity Price
                      </span>
                      <span className="text-foreground font-medium">
                        ${formatNumber(country.cooking.electricityPrice)}/kWh
                      </span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-green-500/10 rounded border border-green-500/30">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Gift className="h-3 w-3 text-green-600" />
                        Appliance Subsidy
                      </span>
                      <span className="text-green-600 font-medium">
                        ${formatNumber(country.cooking.applianceSubsidy, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-blue-500/10 rounded border border-blue-500/30">
                      <span className="text-muted-foreground">Expense Reduction</span>
                      <span className="text-blue-600 font-medium">
                        ${formatNumber((country.cooking.expenseReduction ?? 0) / 1000000, 1)}M
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible>
            <AccordionItem
              value="tax-intersections"
              className="border rounded-lg bg-gradient-to-br from-ciff-blue/10 to-ciff-teal/5 border-ciff-blue/30"
            >
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-ciff-blue" />
                  <span className="font-semibold">E-Cooking Tax Intersections</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Asset</TableHead>
                        <TableHead className="font-semibold">Lifecycle Stage</TableHead>
                        <TableHead className="font-semibold">Tax Intersection</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eCookingTaxIntersections.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{item.asset}</TableCell>
                          <TableCell className="font-medium">{item.stage}</TableCell>
                          <TableCell>
                            <ul className="space-y-0.5 text-xs">
                              {item.taxes.map((tax, taxIdx) => (
                                <li key={taxIdx} className="text-muted-foreground">
                                  • {tax}
                                </li>
                              ))}
                            </ul>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <h4 className="text-xs font-semibold mb-2">Country-Specific Sources:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(countrySources).map(([key, data]) => (
                      <div key={key} className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                        <span className="text-muted-foreground">{data.name}</span>
                        <span className="text-foreground font-medium">{data.source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="mobility" className="space-y-4">
          <Card className="bg-gradient-to-br from-ciff-teal/15 to-ciff-blue/10 border-ciff-teal/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Car className="h-5 w-5 text-ciff-teal" />
                E-Mobility Assumptions - {country.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Battery className="h-4 w-4 text-ciff-teal" />
                    General Parameters
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                      <span className="text-muted-foreground">Total Vehicles (2030)</span>
                      <span className="text-foreground font-medium">
                        {formatNumber((country.transport.totalVehicles2030 ?? 0) / 1000, 0)}K
                      </span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                      <span className="text-muted-foreground">EV Uptake Target</span>
                      <span className="text-foreground font-medium">
                        {formatNumber((country.transport.evUptake ?? 0) * 100, 0)}%
                      </span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                      <span className="text-muted-foreground">Total EVs (2030)</span>
                      <span className="text-foreground font-medium">
                        {formatNumber((country.transport.totalEVs2030 ?? 0) / 1000, 1)}K
                      </span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                      <span className="text-muted-foreground">EV Efficiency</span>
                      <span className="text-foreground font-medium">3,930 kWh/vehicle/year</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-ciff-teal" />
                    Pricing & Fiscal Policy
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        Fuel Price
                      </span>
                      <span className="text-foreground font-medium">
                        ${formatNumber(country.transport.fuelPrice)}/liter
                      </span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        Electricity Price
                      </span>
                      <span className="text-foreground font-medium">
                        ${formatNumber(country.transport.electricityPrice)}/kWh
                      </span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-green-500/10 rounded border border-green-500/30">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Gift className="h-3 w-3 text-green-600" />
                        EV Import Subsidy
                      </span>
                      <span className="text-green-600 font-medium">
                        ${formatNumber(country.transport.evSubsidy, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between p-1.5 bg-blue-500/10 rounded border border-blue-500/30">
                      <span className="text-muted-foreground">Expense Reduction</span>
                      <span className="text-blue-600 font-medium">
                        ${formatNumber((country.transport.expenseReduction ?? 0) / 1000000, 1)}M
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible>
            <AccordionItem
              value="tax-intersections"
              className="border rounded-lg bg-gradient-to-br from-ciff-teal/10 to-ciff-blue/5 border-ciff-teal/30"
            >
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-ciff-teal" />
                  <span className="font-semibold">E-Mobility Tax Intersections</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Asset</TableHead>
                        <TableHead className="font-semibold">Lifecycle Stage</TableHead>
                        <TableHead className="font-semibold">Tax Intersection</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eMobilityTaxIntersections.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{item.asset}</TableCell>
                          <TableCell className="font-medium">{item.stage}</TableCell>
                          <TableCell>
                            <ul className="space-y-0.5 text-xs">
                              {item.taxes.map((tax, taxIdx) => (
                                <li key={taxIdx} className="text-muted-foreground">
                                  • {tax}
                                </li>
                              ))}
                            </ul>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <h4 className="text-xs font-semibold mb-2">Country-Specific Sources:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(countrySources).map(([key, data]) => (
                      <div key={key} className="flex justify-between p-1.5 bg-card/50 rounded border border-border">
                        <span className="text-muted-foreground">{data.name}</span>
                        <span className="text-foreground font-medium">{data.source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>

      <Accordion type="single" collapsible>
        <AccordionItem
          value="limitations"
          className="border rounded-lg bg-gradient-to-br from-ciff-blue/10 to-ciff-teal/10 border-ciff-blue/30"
        >
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-ciff-blue" />
              <span className="font-semibold">Model Limitations</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>• Assumes linear adoption; actual transitions may vary with policy and market dynamics</li>
              <li>• Does not account for infrastructure investment costs</li>
              <li>• Tax calculations assume current structures; governments may adjust rates</li>
              <li>• External factors like global prices and climate impacts not fully modeled</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
