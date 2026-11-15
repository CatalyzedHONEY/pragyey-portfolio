
import { useEffect, useState } from 'react'
import { sanityClient, urlFor } from '../lib/sanity'
import { profile as fallbackProfile } from '../data/profile'

export interface PortfolioProfile {
  fullName: string
  role: string
  tagline: string
  bio: string
  portrait?: {
    asset?: {
      _ref: string
    }
  }
  email?: string
  github?: string
  linkedin?: string
  resume?: {
    asset?: {
      url?: string
    }
  }
}

export function usePortfolioProfile() {
  const [profile, setProfile] = useState({
    fullName: fallbackProfile.name,
    firstName: fallbackProfile.firstName,
    lastName: fallbackProfile.lastName,
    role: fallbackProfile.role,
    tagline: fallbackProfile.tagline,
    introduction: fallbackProfile.introduction,
    portrait: fallbackProfile.portrait,
    email: fallbackProfile.email,
    github: fallbackProfile.github,
    linkedin: fallbackProfile.linkedin,
    resume: fallbackProfile.resume,
  })

  useEffect(() => {
    let active = true

    sanityClient
      .fetch<PortfolioProfile | null>(`
        *[_type == "profile"][0] {
          fullName,
          role,
          tagline,
          bio,
          portrait,
          email,
          github,
          linkedin,
          resume
        }
      `)
      .then((data) => {
        if (!active || !data) return

        const nameParts = data.fullName?.trim().split(/\s+/) ?? []

        setProfile((previous) => ({
          ...previous,
          fullName: data.fullName || previous.fullName,
          firstName: nameParts[0] || previous.firstName,
          lastName: nameParts.slice(1).join(' ') || previous.lastName,
          role: data.role || previous.role,
          tagline: data.tagline || previous.tagline,
          introduction: data.bio || previous.introduction,

          portrait: data.portrait?.asset?._ref
            ? urlFor(data.portrait).width(900).url()
            : previous.portrait,

          email: data.email || previous.email,
          github: data.github || previous.github,
          linkedin: data.linkedin || previous.linkedin,
        }))
      })
      .catch((error) => {
        console.error('Unable to load Sanity profile:', error)
      })

    return () => {
      active = false
    }
  }, [])

  return profile
}
