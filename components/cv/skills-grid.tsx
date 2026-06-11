import type { SkillItem } from "@/lib/cv-types"

export function SkillsGrid({ items }: { items: SkillItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((skill) => (
        <div
          key={skill.name}
          className="rounded-2xl border border-border bg-background/40 p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-medium">{skill.name}</h3>
            <div className="flex gap-1" aria-label={`Proficiency ${skill.level} of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`size-1.5 rounded-full ${
                    i < skill.level ? "bg-primary" : "bg-border"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
            {skill.description}
          </p>
        </div>
      ))}
    </div>
  )
}
