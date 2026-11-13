
import { sanityClient } from './sanity'

export interface SanityEducation {
  _id: string
  institution?: string
  degree?: string
  fieldOfStudy?: string
  startDate?: string
  endDate?: string
  currentlyPursuing?: boolean
  semester?: string
  gpa?: string
  description?: string
  order?: number
}

export interface SanityExperience {
  _id: string
  organization?: string
  role?: string
  employmentType?: string
  startDate?: string
  endDate?: string
  currentlyWorking?: boolean
  description?: string
  technologies?: string[]
  order?: number
}

export interface SanityAchievement {
  _id: string
  title?: string
  issuer?: string
  date?: string
  description?: string
  credentialUrl?: string
  certificateImage?: {
    asset?: {
      _ref?: string
    }
  }
  order?: number
}

export async function getProfile() {
  return sanityClient.fetch(`
    *[_type == "profile"][0] {
      fullName,
      role,
      tagline,
      bio,
      portrait,
      email,
      github,
      linkedin,
      resume,
      location,
      availability
    }
  `)
}

export async function getProjects() {
  return sanityClient.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      description,
      coverImage,
      screenshots,
      technologies,
      githubUrl,
      liveDemoUrl,
      featured,
      order,
      status
    }
  `)
}

export async function getSkills() {
  return sanityClient.fetch(`
    *[_type == "skill"] | order(order asc) {
      _id,
      name,
      category,
      proficiency,
      icon,
      order
    }
  `)
}

export async function getEducation() {
  return sanityClient.fetch<SanityEducation[]>(`
    *[_type == "education"] | order(order asc) {
      _id,
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      currentlyPursuing,
      semester,
      gpa,
      description,
      order
    }
  `)
}

export async function getExperience() {
  return sanityClient.fetch<SanityExperience[]>(`
    *[_type == "experience"] | order(order asc) {
      _id,
      organization,
      role,
      employmentType,
      startDate,
      endDate,
      currentlyWorking,
      description,
      technologies,
      order
    }
  `)
}

export async function getAchievements() {
  return sanityClient.fetch<SanityAchievement[]>(`
    *[_type == "achievement"] | order(order asc) {
      _id,
      title,
      issuer,
      date,
      description,
      credentialUrl,
      certificateImage,
      order
    }
  `)
}
