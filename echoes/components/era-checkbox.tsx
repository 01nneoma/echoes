"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface EraCheckboxProps {
  eras: string[]
  selectedEras: string[]
  onEraChange: (eras: string[]) => void
}

export function EraCheckbox({ eras, selectedEras, onEraChange }: EraCheckboxProps) {
  const [customEra, setCustomEra] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handleEraToggle = (era: string) => {
    if (era === "custom") {
      setShowCustomInput(!showCustomInput)
      if (!showCustomInput) {
        // If we're showing the custom input, don't add "custom" to selectedEras yet
        return
      } else if (customEra && selectedEras.includes(customEra)) {
        // If we're hiding the custom input and customEra is in selectedEras, remove it
        onEraChange(selectedEras.filter((e) => e !== customEra))
        return
      }
    }

    const newSelectedEras = selectedEras.includes(era) ? selectedEras.filter((e) => e !== era) : [...selectedEras, era]

    onEraChange(newSelectedEras)
  }

  const handleCustomEraChange = (value: string) => {
    setCustomEra(value)

    // If the previous custom era was in the selected eras, replace it
    const filteredEras = selectedEras.filter((e) => e !== customEra && !eras.includes(e))

    if (value) {
      onEraChange([...filteredEras, value])
    } else {
      onEraChange(filteredEras)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-4">
        {eras.map((era) => (
          <div key={era} className="flex items-center space-x-2">
            <Checkbox
              id={`era-${era}`}
              checked={selectedEras.includes(era)}
              onCheckedChange={() => handleEraToggle(era)}
            />
            <Label htmlFor={`era-${era}`} className="text-sm font-medium">
              {era}
            </Label>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <Checkbox id="era-custom" checked={showCustomInput} onCheckedChange={() => handleEraToggle("custom")} />
          <Label htmlFor="era-custom" className="text-sm font-medium">
            Custom
          </Label>
        </div>
      </div>

      {showCustomInput && (
        <Input
          placeholder="Enter custom era (e.g., 60s, 10s)"
          value={customEra}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomEraChange(e.target.value)}
          className="mt-2"
        />
      )}
    </div>
  )
}
