"use client"

import { useEffect, useRef, useState } from "react"
import { countryData, type CountryKey } from "@/lib/country-data"

interface LeafletMapProps {
  selectedCountry?: CountryKey
  selectedCountries?: CountryKey[]
  onCountrySelect?: (country: CountryKey) => void
  showAllEqual?: boolean
}

const countryISOCodes: Record<CountryKey, string> = {
  kenya: "KEN",
  ethiopia: "ETH",
  rwanda: "RWA",
  tanzania: "TZA",
  uganda: "UGA",
  malawi: "MWI",
}

export function LeafletMap({ selectedCountry, selectedCountries, onCountrySelect, showAllEqual }: LeafletMapProps) {
  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<any[]>([])
  const [geoJsonData, setGeoJsonData] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)
  const initialZoomApplied = useRef(false)

  const effectiveSelectedCountries = selectedCountries || (selectedCountry ? [selectedCountry] : [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson",
    )
      .then((response) => response.json())
      .then((data) => {
        setGeoJsonData(data)
      })
      .catch((error) => {
        console.error("Error loading GeoJSON:", error)
      })
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !isMounted || !mapContainerRef.current || !geoJsonData) return

    const container = mapContainerRef.current
    if (!container.offsetWidth || !container.offsetHeight) {
      return
    }

    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      if (!mapRef.current && container) {
        try {
          const map = L.map(container).setView([0, 20], 3)

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(map)

          mapRef.current = map
        } catch (error) {
          console.error("Error initializing map:", error)
          return
        }
      }

      layersRef.current.forEach((layer) => layer.remove())
      layersRef.current = []

      Object.entries(countryData).forEach(([key, data]) => {
        const isSelected = effectiveSelectedCountries.includes(key as CountryKey)
        const isoCode = countryISOCodes[key as CountryKey]

        const countryFeature = geoJsonData.features?.find((feature: any) => {
          const props = feature?.properties
          if (!props) return false
          return props.ISO_A3 === isoCode || props.ADM0_A3 === isoCode || props.ISO_A3_EH === isoCode
        })

        if (countryFeature) {
          const geoJsonLayer = L.geoJSON(countryFeature, {
            style: {
              fillColor: showAllEqual ? "#0078D4" : isSelected ? "#0078D4" : "#d1d5db",
              fillOpacity: showAllEqual ? 0.7 : isSelected ? 0.8 : 0.3,
              color: showAllEqual ? "#0078D4" : isSelected ? "#0078D4" : "#9ca3af",
              weight: showAllEqual ? 2 : isSelected ? 3 : 1,
              opacity: 1,
            },
          }).addTo(mapRef.current)

          geoJsonLayer.on("mouseover", (e: any) => {
            const layer = e.target
            if (!showAllEqual) {
              layer.setStyle({
                weight: 3,
                fillOpacity: 0.9,
              })
            }
          })

          geoJsonLayer.on("mouseout", (e: any) => {
            const layer = e.target
            if (!showAllEqual) {
              layer.setStyle({
                weight: isSelected ? 3 : 1,
                fillOpacity: isSelected ? 0.8 : 0.3,
              })
            }
          })

          const netImpact =
            data.cooking.expenseReduction +
            data.transport.expenseReduction -
            (data.cooking.taxReduction + data.transport.taxReduction)

          geoJsonLayer.bindPopup(`
            <div style="font-family: system-ui; min-width: 200px;">
              <h3 style="color: ${data.color}; font-weight: bold; margin: 0 0 8px 0; font-size: 16px;">
                ${data.name}
              </h3>
              <div style="font-size: 13px; line-height: 1.6;">
                <div><strong>Population (2030):</strong> ${data.cooking.population2030}M</div>
                <div><strong>Total EVs:</strong> ${(data.transport.totalEVs / 1000).toFixed(0)}K</div>
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
                  <strong style="color: ${data.color};">Net Impact:</strong> 
                  <span style="font-weight: bold;">$${netImpact.toFixed(1)}M</span>
                </div>
              </div>
            </div>
          `)

          if (onCountrySelect) {
            geoJsonLayer.on("click", () => {
              onCountrySelect(key as CountryKey)
            })
          }

          layersRef.current.push(geoJsonLayer)
        }
      })

      if (mapRef.current) {
        mapRef.current.setView([0, 20], 3, {
          animate: !initialZoomApplied.current,
        })
        initialZoomApplied.current = true
      }
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [effectiveSelectedCountries, onCountrySelect, geoJsonData, showAllEqual, isMounted])

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={mapContainerRef} className="w-full h-full min-h-[500px]" />
    </div>
  )
}
