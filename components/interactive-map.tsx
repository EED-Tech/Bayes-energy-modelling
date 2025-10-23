"use client"

import { useState } from "react"
import { countryData, type CountryKey } from "@/lib/country-data"
import { Card } from "@/components/ui/card"

interface InteractiveMapProps {
  selectedCountry?: CountryKey
  onCountrySelect: (country: CountryKey) => void
  showAllCountries?: boolean
}

export function InteractiveMap({ selectedCountry, onCountrySelect, showAllCountries = false }: InteractiveMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<CountryKey | null>(null)

  // Convert lat/lng to SVG coordinates (simplified projection)
  const projectCoordinates = (lat: number, lng: number) => {
    // East Africa bounds: roughly -12 to 15 lat, 22 to 52 lng
    const minLat = -12
    const maxLat = 15
    const minLng = 22
    const maxLng = 52

    const x = ((lng - minLng) / (maxLng - minLng)) * 800
    const y = ((maxLat - lat) / (maxLat - minLat)) * 600

    return { x, y }
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg overflow-hidden">
      <svg viewBox="0 0 800 600" className="w-full h-full">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#grid)" />

        {/* Country markers */}
        {Object.entries(countryData).map(([key, data]) => {
          const { x, y } = projectCoordinates(data.coordinates[0], data.coordinates[1])
          const isSelected = selectedCountry === key
          const isHovered = hoveredCountry === key
          const radius = isSelected ? 24 : isHovered ? 20 : 16

          return (
            <g key={key}>
              {/* Glow effect for selected/hovered */}
              {(isSelected || isHovered) && (
                <circle cx={x} cy={y} r={radius + 8} fill={data.color} opacity="0.2" className="animate-pulse" />
              )}

              {/* Main marker */}
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill={data.color}
                stroke="white"
                strokeWidth={isSelected ? 3 : 2}
                opacity={isSelected ? 1 : isHovered ? 0.9 : 0.8}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredCountry(key as CountryKey)}
                onMouseLeave={() => setHoveredCountry(null)}
                onClick={() => onCountrySelect(key as CountryKey)}
              />

              {/* Country label */}
              <text
                x={x}
                y={y + radius + 16}
                textAnchor="middle"
                className="text-xs font-medium fill-current pointer-events-none"
                style={{ fontSize: isSelected ? "14px" : "12px" }}
              >
                {data.name}
              </text>

              {/* Tooltip on hover */}
              {isHovered && (
                <g>
                  <rect
                    x={x + 30}
                    y={y - 60}
                    width="180"
                    height="80"
                    rx="8"
                    fill="white"
                    stroke={data.color}
                    strokeWidth="2"
                    className="drop-shadow-lg"
                  />
                  <text x={x + 40} y={y - 40} className="text-xs font-bold" fill={data.color}>
                    {data.name}
                  </text>
                  <text x={x + 40} y={y - 25} className="text-xs" fill="currentColor">
                    Population: {data.cooking.population2030}M
                  </text>
                  <text x={x + 40} y={y - 10} className="text-xs" fill="currentColor">
                    EVs: {(data.transport.totalEVs / 1000).toFixed(0)}K
                  </text>
                  <text x={x + 40} y={y + 5} className="text-xs font-medium" fill={data.color}>
                    Net: $
                    {(
                      data.cooking.expenseReduction +
                      data.transport.expenseReduction -
                      (data.cooking.taxReduction + data.transport.taxReduction)
                    ).toFixed(1)}
                    M
                  </text>
                </g>
              )}
            </g>
          )
        })}

        {/* Connection lines between countries (optional visual enhancement) */}
        <g opacity="0.1" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4">
          <line
            x1={projectCoordinates(9.145, 40.4897).x}
            y1={projectCoordinates(9.145, 40.4897).y}
            x2={projectCoordinates(1.3733, 32.2903).x}
            y2={projectCoordinates(1.3733, 32.2903).y}
          />
          <line
            x1={projectCoordinates(1.3733, 32.2903).x}
            y1={projectCoordinates(1.3733, 32.2903).y}
            x2={projectCoordinates(-0.0236, 37.9062).x}
            y2={projectCoordinates(-0.0236, 37.9062).y}
          />
          <line
            x1={projectCoordinates(-0.0236, 37.9062).x}
            y1={projectCoordinates(-0.0236, 37.9062).y}
            x2={projectCoordinates(-6.369, 34.8888).x}
            y2={projectCoordinates(-6.369, 34.8888).y}
          />
        </g>
      </svg>

      {/* Legend */}
      <Card className="absolute bottom-4 right-4 p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <div className="text-xs font-medium mb-2">Countries</div>
        <div className="space-y-1">
          {Object.entries(countryData).map(([key, data]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
              <span className="text-xs">{data.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
