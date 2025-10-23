"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { urbanShareData, countryColors } from "@/lib/regional-trend-data"

export function UrbanShareChart() {
  return (
    <Card className="bg-gradient-to-br from-ciff-blue/5 to-ciff-teal/5 border-border shadow-lg">
      <CardHeader>
        <CardTitle>Urbanization Trends</CardTitle>
        <CardDescription>Urban population share (%) from 1960 to 2100</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={urbanShareData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="year"
              stroke="hsl(var(--muted-foreground))"
              label={{ value: "Year", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              label={{ value: "Urban Share (%)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />

            {/* Fitted curves (solid lines) */}
            <Line
              type="monotone"
              dataKey="ethiopia"
              stroke={countryColors.ethiopia}
              name="Ethiopia Fit"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="kenya"
              stroke={countryColors.kenya}
              name="Kenya Fit"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="tanzania"
              stroke={countryColors.tanzania}
              name="Tanzania Fit"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="uganda"
              stroke={countryColors.uganda}
              name="Uganda Fit"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="malawi"
              stroke={countryColors.malawi}
              name="Malawi Fit"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
