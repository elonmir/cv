import en from "@/data/cv.en.json"
import de from "@/data/cv.de.json"
import type { CVData, Locale } from "@/lib/cv-types"
import { CVApp } from "@/components/cv/cv-app"

const data: Record<Locale, CVData> = {
  en: en as CVData,
  de: de as CVData,
}

export default function Page() {
  return <CVApp data={data} />
}
