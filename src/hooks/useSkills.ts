
import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity'

import type { SkillCategory } from '../data/skills'

interface SanitySkill {
  name: string
  category: string
  order?: number
}

export function useSkills() {
  const [skills, setSkills] = useState<SkillCategory[]>([])

  useEffect(() => {
    let active = true

    sanityClient
      .fetch<SanitySkill[]>(`
        *[_type == "skill"] | order(order asc) {
          name,
          category,
          order
        }
      `)
      .then((data) => {
        if (!active || !data) return

        const grouped = data.reduce<SkillCategory[]>((result, skill) => {
          const existing = result.find(
            (item) => item.category === skill.category,
          )

          if (existing) {
            existing.skills.push(skill.name)
          } else {
            result.push({
              category: skill.category,
              skills: [skill.name],
            })
          }

          return result
        }, [])

        setSkills(grouped)
      })
      .catch((error) => {
        console.error('Unable to load Sanity skills:', error)
      })

    return () => {
      active = false
    }
  }, [])

  return skills
}
