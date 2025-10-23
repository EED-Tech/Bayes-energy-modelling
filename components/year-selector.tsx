"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Check, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface YearSelectorProps {
  selectedYear: number
  onYearChange: (year: number) => void
  className?: string
}

const PROJECTION_YEARS = [2025, 2026, 2027, 2028, 2029, 2030]

export function YearSelector({ selectedYear, onYearChange, className }: YearSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between bg-background/80 backdrop-blur-sm border-ciff-teal/30 hover:border-ciff-teal/50 cursor-pointer transition-all hover:shadow-md",
            className,
          )}
        >
          <Calendar className="mr-2 h-4 w-4 text-ciff-teal" />
          <span className="font-medium">{selectedYear}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end" sideOffset={4}>
        <Command>
          <CommandList>
            <CommandEmpty>No year found.</CommandEmpty>
            <CommandGroup heading="Projection Years">
              {PROJECTION_YEARS.map((year) => (
                <CommandItem
                  key={year}
                  onSelect={() => {
                    onYearChange(year)
                    setOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedYear === year ? "opacity-100 text-ciff-teal" : "opacity-0")}
                  />
                  <span className={selectedYear === year ? "font-semibold text-ciff-teal" : ""}>{year}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
