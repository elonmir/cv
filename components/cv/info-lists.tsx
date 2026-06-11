import type { EducationItem, LanguageItem, HobbyItem } from "@/lib/cv-types"

export function EducationList({ items }: { items: EducationItem[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item, i) => (
        <li key={i} className="flex flex-col gap-1">
          <h3 className="font-medium text-pretty">{item.institution}</h3>
          <span className="shrink-0 text-xs font-medium text-muted-foreground">
            {item.start} — {item.end}
          </span>
          <p className="text-sm text-muted-foreground text-pretty">{item.detail}</p>
        </li>
      ))}
    </ul>
  )
}

export function LanguageList({ items }: { items: LanguageItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.name}>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-medium">{item.name}</h3>
            <span className="text-sm text-primary">{item.level}</span>
          </div>
          {item.note ? (
            <p className="mt-0.5 text-sm italic text-muted-foreground text-pretty">{item.note}</p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export function HobbyList({ items }: { items: HobbyItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.name}>
          <h3 className="font-medium">{item.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  )
}
