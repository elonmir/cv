"use client"

import type { Locale } from "@/lib/cv-types"
import { ThemeToggle } from "./theme-toggle"
import { PrintButton } from "./print-button"
import { LanguageToggle } from "./language-toggle"

export function CVToolbar({
  locale,
  onLocaleChange,
}: {
  locale: Locale
  onLocaleChange: (next: Locale) => void
}) {
  return (
    <div className="flex items-center justify-end gap-1 no-print">
      <LanguageToggle locale={locale} onChange={onLocaleChange} />
      <ThemeToggle />
      <PrintButton />
    </div>
  )
}
