import { useEffect, useState } from 'react'
import {
  achievements as fallbackAchievements,
  type Achievement,
} from '../data/achievements'
import { formatSanityDate, safeHttpUrl } from '../lib/formatDate'
import { getAchievements, type SanityAchievement } from '../lib/queries'
import { urlFor } from '../lib/sanity'

function certificateUrl(image: SanityAchievement['certificateImage']) {
  if (!image?.asset?._ref) return undefined

  try {
    return urlFor(image).width(960).url()
  } catch {
    return undefined
  }
}

function mapAchievement(item: SanityAchievement): Achievement | null {
  const title = item.title?.trim() ?? ''
  if (!title) return null

  return {
    id: item._id,
    title,
    issuer: item.issuer?.trim() || undefined,
    date: formatSanityDate(item.date),
    description: item.description?.trim() || undefined,
    credentialUrl: safeHttpUrl(item.credentialUrl),
    certificateImage: certificateUrl(item.certificateImage),
  }
}

export function useAchievements() {
  const [entries, setEntries] = useState<Achievement[]>(fallbackAchievements)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    let active = true

    getAchievements()
      .then((data) => {
        if (!active) return

        const mapped = (data ?? [])
          .map(mapAchievement)
          .filter((item): item is Achievement => item !== null)

        if (mapped.length > 0) setEntries(mapped)
        setSettled(true)
      })
      .catch((error) => {
        console.error('Unable to load Sanity achievements:', error)
        if (active) setSettled(true)
      })

    return () => {
      active = false
    }
  }, [])

  return { entries, settled }
}
