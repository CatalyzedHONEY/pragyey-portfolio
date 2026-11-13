import { useEffect, useState } from 'react'
import { education as fallbackEducation, type Education } from '../data/education'
import { formatSanityDate } from '../lib/formatDate'
import { getEducation, type SanityEducation } from '../lib/queries'

function mapEducation(item: SanityEducation): Education | null {
  const institution = item.institution?.trim() ?? ''
  if (!institution) return null

  const degree = item.degree?.trim() ?? ''
  const fieldOfStudy = item.fieldOfStudy?.trim()
  const description = item.description?.trim()

  let status: Education['status']
  if (item.currentlyPursuing === true) status = 'Currently pursuing'
  else if (item.currentlyPursuing === false) status = 'Completed'

  return {
    degree,
    institution,
    status,
    semesterLabel: item.semester?.trim() || undefined,
    gpaLabel: item.gpa?.trim() || undefined,
    fieldOfStudy:
      fieldOfStudy && fieldOfStudy !== degree ? fieldOfStudy : undefined,
    startDate: formatSanityDate(item.startDate),
    endDate: formatSanityDate(item.endDate),
    description: description || undefined,
  }
}

export function useEducation() {
  const [entries, setEntries] = useState<Education[]>(fallbackEducation)

  useEffect(() => {
    let active = true

    getEducation()
      .then((data) => {
        if (!active || !data || data.length === 0) return

        const mapped = data
          .map(mapEducation)
          .filter((item): item is Education => item !== null)

        if (mapped.length === 0) return
        setEntries(mapped)
      })
      .catch((error) => {
        console.error('Unable to load Sanity education:', error)
      })

    return () => {
      active = false
    }
  }, [])

  return entries
}
