"use client"

import { useEffect, useState, useCallback } from "react"
import QRCode from "qrcode"
import { X } from "lucide-react"
import type { Basics } from "@/lib/cv-types"

function buildVCard(basics: Basics) {
  const [last, ...firstParts] = basics.name.split(" ").reverse()
  const first = firstParts.reverse().join(" ")
  const url = basics.links?.[0]?.url ?? ""
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${last};${first};;;`,
    `FN:${basics.name}`,
    `TITLE:${basics.title}`,
    `EMAIL;TYPE=INTERNET:${basics.email}`,
    `ADR;TYPE=HOME:;;;${basics.location};;;`,
    url ? `URL:${url}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n")
}

export function ContactQR({ basics }: { basics: Basics }) {
  const [dataUrl, setDataUrl] = useState<string>("")
  const [open, setOpen] = useState(false)
  const firstName = basics.name.split(" ")[0]

  useEffect(() => {
    const vcard = buildVCard(basics)
    QRCode.toDataURL(vcard, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 512,
      color: { dark: "#1e293b", light: "#ffffff" },
    })
      .then(setDataUrl)
      .catch(() => setDataUrl(""))
  }, [basics])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, close])

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={!dataUrl}
        aria-label={`Enlarge QR code to save ${firstName}'s contact details`}
        className="group rounded-2xl border border-border bg-white p-3 shadow-sm outline-none transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-default"
      >
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={dataUrl || "/placeholder.svg"}
            alt={`Scan to save ${basics.name}'s contact details`}
            className="size-40"
            width={160}
            height={160}
          />
        ) : (
          <div className="size-40 animate-pulse rounded-lg bg-muted" />
        )}
      </button>
      <span className="text-sm text-muted-foreground text-pretty">
        Tap to enlarge — scan to save {firstName}&apos;s contact details
      </span>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${basics.name} contact QR code`}
          onClick={close}
          className="no-print fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-sm flex-col items-center gap-5 rounded-3xl bg-card p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground outline-none transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dataUrl || "/placeholder.svg"}
                alt={`Scan to save ${basics.name}'s contact details`}
                className="size-64 sm:size-72"
                width={288}
                height={288}
              />
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{basics.name}</p>
              <p className="text-sm text-muted-foreground text-pretty">
                Scan with your phone camera to save the contact
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
