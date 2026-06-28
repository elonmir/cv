export type Locale = "en" | "de"

export interface UILabels {
  experience: string
  skills: string
  contact: string
  education: string
  volunteering: string
  languages: string
  hobbies: string
  testimonials: string
}

export interface CVData {
  ui: UILabels
  basics: Basics
  experience: ExperienceItem[]
  education: EducationItem[]
  volunteering: EducationItem[]
  skills: SkillItem[]
  languages: LanguageItem[]
  hobbies: HobbyItem[]
  testimonials: Testimonial[]
  imprint: Imprint
}

export interface ImprintSection {
  heading: string
  paragraphs: string[]
}

export interface Imprint {
  title: string
  backToCV: string
  lastUpdated: string
  providerHeading: string
  contactLabel: string
  emailLabel: string
  sections: ImprintSection[]
  enable: boolean
}

export interface Basics {
  name: string
  title: string
  photo?: string
  summary: string
  email: string
  birth: string
  showBirth?: boolean
  location: string
  links?: { label: string; url: string }[]
}

export interface ExperienceItem {
  company: string
  position: string
  start: string
  end: string
  description: string[]
}

export interface EducationItem {
  institution: string
  detail: string
  start: string
  end: string
}

export interface SkillItem {
  name: string
  level: number // 1-5
  description: string
}

export interface LanguageItem {
  name: string
  level: string
  note?: string
}

export interface HobbyItem {
  name: string
  description: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
}
