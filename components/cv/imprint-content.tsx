"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import type { CVData, Locale } from "@/lib/cv-types"
import enData from "@/data/cv.en.json"
import deData from "@/data/cv.de.json"

const data: Record<Locale, CVData> = {
    en: enData as CVData,
    de: deData as CVData,
}

export function ImprintContent() {
    const [locale, setLocale] = useState<Locale>("en")

    useEffect(() => {
        const stored = localStorage.getItem("cv-locale") as Locale | null
        if (stored === "en" || stored === "de") {
            setLocale(stored)
        } else if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("de")) {
            setLocale("de")
        }
    }, [])

    const cv = data[locale]
    const imprint = cv.imprint
    const basics = cv.basics

    return (
        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
            <div className="mb-8 flex items-center gap-2">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    {imprint.backToCV}
                </Link>
            </div>

            <article className="max-w-none">
                <h1 className="text-3xl font-bold tracking-tight text-balance">{imprint.title}</h1>

                <section className="mt-8">
                    <h2 className="mb-3 text-xl font-semibold">{imprint.providerHeading}</h2>

                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                        <p>
                            <strong className="text-foreground">{basics.name}</strong>
                            <br />
                            {basics.location}
                        </p>

                        <p>
                            <strong className="text-foreground">{imprint.contactLabel}</strong>
                            <br />
                            <span className="inline-flex items-center gap-1.5">
                <Mail className="size-4 text-primary" aria-hidden="true" />
                                {imprint.emailLabel}:{" "}
                                <a href={`mailto:${basics.email}`} className="text-primary hover:underline">
                  {basics.email}
                </a>
              </span>
                        </p>
                    </div>
                </section>

                {imprint.sections.map((section) => (
                    <section key={section.heading} className="mt-8">
                        <h2 className="mb-3 text-xl font-semibold">{section.heading}</h2>
                        <div className="space-y-3 text-muted-foreground leading-relaxed">
                            {section.paragraphs.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </section>
                ))}

                <div className="mt-12 border-t border-border pt-8 text-sm text-muted-foreground">
                    <p>{imprint.lastUpdated}</p>
                </div>
            </article>
        </main>
    )
}
