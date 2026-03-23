export interface PersonalInfo {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  photo: string;
}

export interface Summary {
  title: string;
  description: string;
  languages: string;
}

export interface TechnicalExpertise {
  backend: string[];
  frontend: string[];
  automation: string[];
  data: string[];
  devops: string[];
  monitoring: string[];
  tools: string[];
  management: string[];
  other: string[];
}

export interface CertifiedSkill {
  name: string;
  provider: string;
  url?: string;
}

export interface WorkExperience {
  position: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string;
  projects?: string[];
  responsibilities?: string[];
  skills: string[];
}

export interface Education {
  institution: string;
  degree: string;
  specialization: string;
  period: string;
}

export interface Certification {
  name: string;
  provider: string;
  issued: string;
  url?: string;
  skills: string[];
}

export interface Resume {
  personalInfo: PersonalInfo;
  summary: Summary;
  technicalExpertise: TechnicalExpertise;
  certifiedSkills: CertifiedSkill[];
  workHistory: WorkExperience[];
  education: Education[];
  certifications: Certification[];
}
