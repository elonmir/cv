import type { Testimonial } from "@/lib/cv-types"
import { Quote } from "lucide-react"

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative flex flex-col gap-4 rounded-2xl border border-border bg-secondary/40 p-5"
        >
          <Quote className="size-6 text-primary" aria-hidden="true" />
          <blockquote className="text-sm leading-relaxed text-foreground text-pretty">
            {item.quote}
          </blockquote>
          <footer className="mt-auto">
            <p className="text-sm font-medium text-foreground">{item.author}</p>
            <p className="text-xs text-muted-foreground text-pretty">{item.role}</p>
          </footer>
        </li>
      ))}
    </ul>
  )
}
