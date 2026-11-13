export interface Experience {
  id: string
  organization: string
  role?: string
  employmentType?: string
  startDate?: string
  endDate?: string
  currentlyWorking?: boolean
  description?: string
  technologies?: string[]
}

export const experience: Experience[] = []
