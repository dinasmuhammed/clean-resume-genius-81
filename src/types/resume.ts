import { User, Briefcase, GraduationCap, Code } from "lucide-react";

export interface PersonalInfo {
  fullName?: string;
  email?: string;
  phone?: string;
  website?: string;
  summary?: string;
}

export interface Experience {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

export type SectionType = "personal" | "experience" | "education" | "skills";

export interface Section {
  id: SectionType;
  label: string;
  icon: typeof User | typeof Briefcase | typeof GraduationCap | typeof Code;
}