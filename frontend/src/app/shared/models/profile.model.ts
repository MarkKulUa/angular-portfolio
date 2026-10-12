/**
 * Portfolio content model (v2).
 * Single source for the landing page, the online resume and the generated CV PDF.
 * Contains no phone or email fields by design (public contact is LinkedIn only).
 */

export interface Profile {
  person: Person;
  headline: Headline;
  /** Plain text; paragraphs separated by a blank line. */
  summary: string;
  impactMetrics: ImpactMetric[];
  caseStudies: CaseStudy[];
  principles: Principle[];
  competencies: CompetencyGroup[];
  experience: Employer[];
  independentProjects: IndependentProject[];
  education: Education[];
  certifications: Certification[];
  languages: Language[];
}

export interface Person {
  name: string;
  location: string;
  workFormat: string;
  links: ProfileLinks;
  photo: string;
  cvFileName: string;
  availability?: string;
}

export interface ProfileLinks {
  linkedin: string;
  credly: string;
}

export interface Headline {
  role: string;
  /** Short facts rendered with separators, e.g. "15+ Years in Software Engineering". */
  tagline: string[];
  valueStatement: string;
  /** One-line team scope for the hero. */
  scope: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
  context?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  challenge: string;
  approach: string;
  result: string;
  tags: string[];
}

export interface Principle {
  title: string;
  description: string;
}

export interface CompetencyGroup {
  title: string;
  items: string[];
  /** Optional secondary line, e.g. delivery metrics or observability tools. */
  extra?: CompetencyExtra;
}

export interface CompetencyExtra {
  label: string;
  items: string[];
}

export interface Period {
  /** "Jul 2011" or "2018" */
  start: string;
  /** "Jul 2025", "2022" or "Present" */
  end: string;
}

export interface Employer {
  company: string;
  employmentType: string;
  period: Period;
  location: string;
  /** Reverse chronological order. */
  roles: Role[];
  focus?: string[];
  tech?: string[];
}

export interface Role {
  title: string;
  period: Period;
  highlights: string[];
}

export interface IndependentProject {
  name: string;
  description: string;
  tech: string[];
}

export interface Education {
  institution: string;
  degree: string;
  specialization: string;
  period: Period;
}

export interface Certification {
  name: string;
  provider: string;
  issued: string;
  expires?: string;
  /** Badge page (Credly). */
  url?: string;
  /** Issuer verification page. */
  verifyUrl?: string;
  featured?: boolean;
  skills?: string[];
}

export interface Language {
  name: string;
  level: string;
}
