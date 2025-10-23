"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { populationData, countryColors } from "@/lib/regional-trend-data"

export function PopulationChart() {
  return (
    <Card className="bg-gradient-to-br from-ciff-blue/5 to-ciff-teal/5 border-border shadow-lg">
      <CardHeader>
        <CardTitle>Population Growth Projections</CardTitle>
        <CardDescription>Historical data and projected population (millions) from 1960 to 2100</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={populationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="year"
              stroke="hsl(var(--muted-foreground))"
              label={{ value: "Year", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              label={{ value: "Population (millions)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />

            {/* Fitted trend lines (dashed) */}
            <Line
              type="monotone"
              dataKey="ethiopia"
              stroke={countryColors.ethiopia}
              name="Ethiopia fit"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="kenya"
              stroke={countryColors.kenya}
              name="Kenya fit"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="tanzania"
              stroke={countryColors.tanzania}
              name="Tanzania fit"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="uganda"
              stroke={countryColors.uganda}
              name="Uganda fit"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="malawi"
              stroke={countryColors.malawi}
              name="Malawi fit"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
