"use client"

import { useEffect, useState } from "react"
import { Briefcase, GraduationCap, Wrench, Languages, Heart, QrCode, HandHeart, MessageSquareQuote } from "lucide-react"
import type { CVData, Locale } from "@/lib/cv-types"
import { CVHeader } from "@/components/cv/cv-header"
import { CVToolbar } from "@/components/cv/cv-toolbar"
import { Section } from "@/components/cv/section"
import { ExperienceTimeline } from "@/components/cv/experience-timeline"
import { SkillsGrid } from "@/components/cv/skills-grid"
import { EducationList, LanguageList, HobbyList } from "@/components/cv/info-lists"
import { ContactQR } from "@/components/cv/contact-qr"
import { Testimonials } from "@/components/cv/testimonials"

export function CVApp({ data }: { data: Record<Locale, CVData> }) {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    const stored = localStorage.getItem("cv-locale") as Locale | null
    if (stored === "en" || stored === "de") {
      setLocale(stored)
    } else if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("de")) {
      setLocale("de")
    }
  }, [])

  function changeLocale(next: Locale) {
    setLocale(next)
    localStorage.setItem("cv-locale", next)
    document.documentElement.lang = next
  }

  const cv = data[locale]
  const t = cv.ui

  const sidebarSections = [
    cv.basics.email || cv.basics.links?.length ? (
      <Section key="contact" title={t.contact} icon={QrCode}>
        <ContactQR basics={cv.basics} />
      </Section>
    ) : null,
    cv.education?.length ? (
      <Section key="education" title={t.education} icon={GraduationCap}>
        <EducationList items={cv.education} />
      </Section>
    ) : null,
    cv.volunteering?.length ? (
      <Section key="volunteering" title={t.volunteering} icon={HandHeart}>
        <EducationList items={cv.volunteering} />
      </Section>
    ) : null,
    cv.languages?.length ? (
      <Section key="languages" title={t.languages} icon={Languages}>
        <LanguageList items={cv.languages} />
      </Section>
    ) : null,
    cv.hobbies?.length ? (
      <Section key="hobbies" title={t.hobbies} icon={Heart}>
        <HobbyList items={cv.hobbies} />
      </Section>
    ) : null,
  ].filter(Boolean)

  const hasSidebar = sidebarSections.length > 0

  return (
    <main className="mx-auto max-w-5xl px-4 pb-8 pt-3 sm:px-6 sm:pb-12 sm:pt-4">
      <div>
        <div className="mb-2">
          <CVToolbar locale={locale} onLocaleChange={changeLocale} />
        </div>
        <CVHeader basics={cv.basics} />

        <div className={hasSidebar ? "mt-6 grid gap-6 lg:grid-cols-3" : "mt-6"}>
          <div className={hasSidebar ? "space-y-6 lg:col-span-2" : "space-y-6"}>
            <Section title={t.experience} icon={Briefcase}>
              <ExperienceTimeline items={cv.experience} />
            </Section>
          </div>

          {hasSidebar && <aside className="space-y-6">{sidebarSections}</aside>}
        </div>

        <div className="mt-6 space-y-6">
          <Section title={t.skills} icon={Wrench}>
            <SkillsGrid items={cv.skills} />
          </Section>

          <Section title={t.testimonials} icon={MessageSquareQuote}>
            <Testimonials items={cv.testimonials} />
          </Section>
        </div>
      </div>
    </main>
  )
}
