import type { ExperienceItem } from "@/lib/cv-types"

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative space-y-8 border-l border-border pl-6">
      {items.map((item, i) => (
        <li key={`${item.company}-${i}`} className="relative">
          <span
            className="absolute -left-[1.6875rem] top-1.5 size-3 rounded-full border-2 border-card bg-primary ring-4 ring-card"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="font-semibold text-pretty">
              {item.position}
              <span className="text-primary"> · {item.company}</span>
            </h3>
            <span className="shrink-0 self-start rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {item.start} — {item.end}
            </span>
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {item.description.map((d, j) => (
              <li key={j} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60" aria-hidden="true" />
                <span className="text-pretty">{d}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
