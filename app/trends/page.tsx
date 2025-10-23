"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function TrendsPage() {
  return (
    <div className="container mx-auto px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Regional Trend Analysis</h1>
        <p className="text-sm text-muted-foreground">
          Long-term projections for electrification, population growth, and urbanization across East Africa (1960-2100)
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-ciff-teal/10 to-ciff-blue/5 border-ciff-teal/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">Electrification Rate Trends</CardTitle>
            <CardDescription className="text-xs">
              Urban vs rural electrification rates across East African countries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px]">
              <Image
                src="/electrification-rate-comparison.png"
                alt="Electrification rate comparison showing urban (solid lines) and rural (dashed lines) trends from 1960 to 2100 for Kenya, Uganda, Ethiopia, Tanzania, and Malawi"
                fill
                className="object-contain"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-ciff-blue/10 to-ciff-teal/5 border-ciff-blue/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">Population Growth Projections</CardTitle>
            <CardDescription className="text-xs">Historical data and future projections in millions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px]">
              <Image
                src="/population-comparison.png"
                alt="Population comparison showing historical data points and fitted projection lines from 1960 to 2100 for Ethiopia, Malawi, Tanzania, Uganda, and Kenya"
                fill
                className="object-contain"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-ciff-teal/5 to-ciff-blue/10 border-ciff-teal/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">Urban Share Projections</CardTitle>
            <CardDescription className="text-xs">Percentage of population living in urban areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px]">
              <Image
                src="/urban-share-comparison.png"
                alt="Urban share comparison showing historical data points and fitted curves from 1960 to 2100 for Kenya, Uganda, Ethiopia, Tanzania, and Malawi"
                fill
                className="object-contain"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
