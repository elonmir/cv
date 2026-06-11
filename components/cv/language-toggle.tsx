"use client"

import type { Locale } from "@/lib/cv-types"
import { cn } from "@/lib/utils"

const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
]

export function LanguageToggle({
  locale,
  onChange,
}: {
  locale: Locale
  onChange: (next: Locale) => void
}) {
  return (
    <div
      className="inline-flex items-center rounded-md border border-input bg-background p-0.5"
      role="group"
      aria-label="Select language"
    >
      {locales.map(({ code, label }) => {
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            aria-pressed={active}
            className={cn(
              "rounded-sm px-2.5 py-1 text-xs font-semibold transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
