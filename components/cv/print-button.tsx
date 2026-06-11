"use client"

import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PrintButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => window.print()}
      aria-label="Print or save as PDF"
    >
      <Printer className="size-4" />
    </Button>
  )
}
