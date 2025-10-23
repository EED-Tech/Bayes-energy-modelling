"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { electrificationData, countryColors } from "@/lib/regional-trend-data"

export function ElectrificationChart() {
  return (
    <Card className="bg-gradient-to-br from-ciff-blue/5 to-ciff-teal/5 border-border shadow-lg">
      <CardHeader>
        <CardTitle>Electrification Rate Trends</CardTitle>
        <CardDescription>Urban and rural electrification rates (%) from 1960 to 2100</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={electrificationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="year"
              stroke="hsl(var(--muted-foreground))"
              label={{ value: "Year", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              label={{ value: "Electrification Rate (%)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />

            {/* Kenya */}
            <Line
              type="monotone"
              dataKey="kenyaUrban"
              stroke={countryColors.kenya}
              name="Kenya Urban"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="kenyaRural"
              stroke={countryColors.kenya}
              name="Kenya Rural"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />

            {/* Uganda */}
            <Line
              type="monotone"
              dataKey="ugandaUrban"
              stroke={countryColors.uganda}
              name="Uganda Urban"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="ugandaRural"
              stroke={countryColors.uganda}
              name="Uganda Rural"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />

            {/* Ethiopia */}
            <Line
              type="monotone"
              dataKey="ethiopiaUrban"
              stroke={countryColors.ethiopia}
              name="Ethiopia Urban"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="ethiopiaRural"
              stroke={countryColors.ethiopia}
              name="Ethiopia Rural"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />

            {/* Tanzania */}
            <Line
              type="monotone"
              dataKey="tanzaniaUrban"
              stroke={countryColors.tanzania}
              name="Tanzania Urban"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="tanzaniaRural"
              stroke={countryColors.tanzania}
              name="Tanzania Rural"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />

            {/* Malawi */}
            <Line
              type="monotone"
              dataKey="malawiUrban"
              stroke={countryColors.malawi}
              name="Malawi Urban"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="malawiRural"
              stroke={countryColors.malawi}
              name="Malawi Rural"
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
