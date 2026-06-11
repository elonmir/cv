"use client"

import { useEffect, useRef, useState } from "react"
import type { Basics } from "@/lib/cv-types"
import { Mail, MapPin, Cake, Link as LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.07 11.07 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5z" />
    </svg>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function CVHeader({ basics }: { basics: Basics }) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    // Hysteresis dead-zone: use two different scroll thresholds for entering
    // and leaving the stuck state. Because collapsing the header changes the
    // page height (which the browser may nudge the scroll for), a single
    // boundary line causes rapid toggling/flicker — especially on mobile where
    // the address bar also resizes the viewport. The gap between ENTER and EXIT
    // absorbs that jitter so the state can't oscillate.
    const ENTER = 16
    const EXIT = 4
    let ticking = false

    const update = () => {
      ticking = false
      // Sentinel sits in normal flow above the sticky header, so its top
      // relative to the viewport is a stable measure of scroll progress
      // independent of the header's (changing) height.
      const top = sentinel.getBoundingClientRect().top
      setIsStuck((prev) => {
        if (!prev && top <= -ENTER) return true
        if (prev && top >= -EXIT) return false
        return prev
      })
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />
      <header
        className={cn(
        "sticky top-0 z-30 overflow-hidden border border-border bg-card/95 shadow-sm backdrop-blur transition-all duration-200 supports-[backdrop-filter]:bg-card/80 print:static print:rounded-3xl print:bg-card print:p-10",
        isStuck ? "rounded-none p-3 sm:p-5" : "rounded-3xl p-6 sm:p-10",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4 transition-all duration-200 sm:gap-6",
          isStuck ? "flex-row" : "flex-col sm:flex-row sm:items-center",
        )}
      >
        {basics.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={basics.photo || "/placeholder.svg"}
            alt={`Portrait of ${basics.name}`}
            className={cn(
              "shrink-0 rounded-2xl object-cover shadow-sm ring-1 ring-border transition-all duration-200",
              isStuck ? "size-12 sm:size-16" : "size-24 sm:size-28",
            )}
            width={112}
            height={112}
          />
        ) : (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-2xl bg-primary font-semibold text-primary-foreground transition-all duration-200",
              isStuck ? "size-12 text-lg sm:size-16 sm:text-xl" : "size-24 text-3xl sm:size-28",
            )}
            aria-hidden="true"
          >
            {initials(basics.name)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h1
            className={cn(
              "font-bold tracking-tight text-balance transition-all duration-200",
              isStuck ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl",
            )}
          >
            {basics.name}
          </h1>
          {/* Title: collapses on mobile when stuck, stays on desktop. The
              grid-rows 1fr→0fr trick animates height smoothly (no display:none
              step) so the header shrinks without a jump. */}
          <div
            className={cn(
              "grid transition-all duration-200 ease-out",
              isStuck
                ? "grid-rows-[0fr] opacity-0 sm:grid-rows-[1fr] sm:opacity-100"
                : "grid-rows-[1fr] opacity-100",
            )}
          >
            <div className="overflow-hidden">
              <p
                className={cn(
                  "font-medium text-primary text-pretty",
                  isStuck ? "mt-0 text-sm sm:mt-0 sm:text-base" : "mt-1 text-lg",
                )}
              >
                {basics.title}
              </p>
            </div>
          </div>

          {/* Contact list: same smooth collapse on mobile when stuck. */}
          <div
            className={cn(
              "grid transition-all duration-200 ease-out",
              isStuck
                ? "grid-rows-[0fr] opacity-0 sm:grid-rows-[1fr] sm:opacity-100"
                : "grid-rows-[1fr] opacity-100",
            )}
          >
            <div className="overflow-hidden">
              <ul
                className={cn(
                  "flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground",
                  isStuck ? "mt-2 sm:mt-2" : "mt-4",
                )}
              >
                <li className="flex items-center gap-1.5">
                  <Mail className="size-4 text-primary" aria-hidden="true" />
                  <a href={`mailto:${basics.email}`} className="hover:text-foreground">
                    {basics.email}
                  </a>
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-primary" aria-hidden="true" />
                  <span>{basics.location}</span>
                </li>
                {basics.showBirth && (
                  <li className="flex items-center gap-1.5">
                    <Cake className="size-4 text-primary" aria-hidden="true" />
                    <span>{basics.birth}</span>
                  </li>
                )}
                {basics.links?.map((link) => {
                  const Icon = link.label.toLowerCase() === "github" ? GithubIcon : LinkIcon
                  return (
                    <li key={link.url} className="flex items-center gap-1.5">
                      <Icon className="size-4 text-primary" aria-hidden="true" />
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Summary: always collapses when stuck, animated via grid-rows so the
          large height change happens smoothly instead of snapping. */}
      <div
        className={cn(
          "grid transition-all duration-200 ease-out",
          isStuck ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100",
        )}
      >
        <div className="overflow-hidden">
          <p className="mt-6 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {basics.summary}
          </p>
        </div>
      </div>
    </header>
    </>
  )
}
