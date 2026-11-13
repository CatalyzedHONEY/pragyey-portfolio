import { useEffect, useState } from 'react'
import { experience as fallbackExperience, type Experience } from '../data/experience'
import { formatSanityDate } from '../lib/formatDate'
import { getExperience, type SanityExperience } from '../lib/queries'

function mapExperience(item: SanityExperience): Experience | null {
  const organization = item.organization?.trim() ?? ''
  if (!organization) return null

  const technologies = (item.technologies ?? [])
    .filter((technology): technology is string => typeof technology === 'string')
    .map((technology) => technology.trim())
    .filter(Boolean)

  return {
    id: item._id,
    organization,
    role: item.role?.trim() || undefined,
    employmentType: item.employmentType?.trim() || undefined,
    startDate: formatSanityDate(item.startDate),
    endDate: formatSanityDate(item.endDate),
    currentlyWorking: item.currentlyWorking === true ? true : undefined,
    description: item.description?.trim() || undefined,
    technologies: technologies.length > 0 ? technologies : undefined,
  }
}

export function useExperience() {
  const [entries, setEntries] = useState<Experience[]>(fallbackExperience)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    let active = true

    getExperience()
      .then((data) => {
        if (!active) return

        const mapped = (data ?? [])
          .map(mapExperience)
          .filter((item): item is Experience => item !== null)

        if (mapped.length > 0) setEntries(mapped)
        setSettled(true)
      })
      .catch((error) => {
        console.error('Unable to load Sanity experience:', error)
        if (active) setSettled(true)
      })

    return () => {
      active = false
    }
  }, [])

  return { entries, settled }
}
