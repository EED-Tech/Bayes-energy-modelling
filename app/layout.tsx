import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AppLayout } from "@/components/app-layout"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "East Africa Energy Dashboard",
  description: "Energy transition modeling for East Africa",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AppLayout>{children}</AppLayout>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
