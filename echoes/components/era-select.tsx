"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface EraSelectProps {
  selectedEras: string[]
  onEraChange: (eras: string[]) => void
}

export function EraSelect({ selectedEras, onEraChange }: EraSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customStartYear, setCustomStartYear] = useState("")
  const [customEndYear, setCustomEndYear] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const predefinedEras = ["2025-2010", "2009-2000", "1999-1990", "1989-1980", "1979-1970"]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleEraToggle = (era: string) => {
    if (era === "custom") {
      setShowCustomInput(!showCustomInput)
      if (!showCustomInput) {
        // If we're showing the custom input, don't add "custom" to selectedEras yet
        return
      } else {
        // If we're hiding the custom input and custom range is in selectedEras, remove it
        const customRange = `${customStartYear}-${customEndYear}`
        if (customStartYear && customEndYear && selectedEras.includes(customRange)) {
          onEraChange(selectedEras.filter((e) => e !== customRange))
        }
        return
      }
    }

    const newSelectedEras = selectedEras.includes(era) ? selectedEras.filter((e) => e !== era) : [...selectedEras, era]

    onEraChange(newSelectedEras)
  }

  const handleCustomRangeChange = () => {
    if (!customStartYear || !customEndYear) return

    // Remove any existing custom ranges
    const filteredEras = selectedEras.filter((era) => {
      // Keep all predefined eras and remove any that look like custom ranges but aren't predefined
      return predefinedEras.includes(era) || !era.includes("-")
    })

    const customRange = `${customStartYear}-${customEndYear}`

    // Add the new custom range
    onEraChange([...filteredEras, customRange])
  }

  const handleRemoveEra = (era: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onEraChange(selectedEras.filter((e) => e !== era))
  }

  // Display content for selected eras
  const getDisplayContent = () => {
    if (selectedEras.length === 0) {
      return <span className="text-gray-300">Select era</span>
    }

    return (
      <div className="flex flex-wrap gap-1">
        {selectedEras.map((era) => (
          <div key={era} className="bg-[#2a2a2a] rounded-md px-2 py-1 flex items-center gap-1 text-sm">
            <span>{era}</span>
            <button onClick={(e) => handleRemoveEra(era, e)} className="text-gray-400 hover:text-white">
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-md cursor-pointer min-h-[56px]"
        onClick={handleToggle}
      >
        <div className="flex-1 overflow-hidden">{getDisplayContent()}</div>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] rounded-md border border-[#333] z-[100] overflow-y-auto"
          style={{
            position: "absolute",
            width: "100%",
            maxHeight: "60vh", // Use viewport height to ensure it's scrollable
            marginBottom: "80px", // Add margin to prevent overlap with nav
          }}
        >
          <div className="p-2 space-y-2">
            <div className="flex items-center space-x-2 p-2">
              <Checkbox
                id="era-custom"
                checked={showCustomInput}
                onCheckedChange={() => handleEraToggle("custom")}
                className="border-gray-500"
              />
              <Label htmlFor="era-custom" className="text-white cursor-pointer">
                Custom range
              </Label>
            </div>

            {showCustomInput && (
              <div className="pl-8 pr-2 pb-2">
                <div className="flex space-x-2 items-center">
                  <Input
                    placeholder="Start year"
                    value={customStartYear}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setCustomStartYear(e.target.value)
                      if (e.target.value && customEndYear) {
                        handleCustomRangeChange()
                      }
                    }}
                    className="bg-[#2a2a2a] border-[#333] text-white"
                    type="number"
                    min="1900"
                    max="2025"
                  />
                  <span className="text-white">-</span>
                  <Input
                    placeholder="End year"
                    value={customEndYear}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setCustomEndYear(e.target.value)
                      if (customStartYear && e.target.value) {
                        handleCustomRangeChange()
                      }
                    }}
                    className="bg-[#2a2a2a] border-[#333] text-white"
                    type="number"
                    min="1900"
                    max="2025"
                  />
                </div>
              </div>
            )}

            {predefinedEras.map((era) => (
              <div key={era} className="flex items-center space-x-2 p-2">
                <Checkbox
                  id={`era-${era}`}
                  checked={selectedEras.includes(era)}
                  onCheckedChange={() => handleEraToggle(era)}
                  className="border-gray-500"
                />
                <Label htmlFor={`era-${era}`} className="text-white cursor-pointer">
                  {era}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
