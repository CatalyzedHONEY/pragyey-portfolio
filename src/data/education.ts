export interface Education {
  degree: string
  institution: string
  status?: 'Currently pursuing' | 'Completed'
  currentSemester?: number
  semesterLabel?: string
  sgpa?: number
  gpaLabel?: string
  officialDegreeTitle?: string
  fieldOfStudy?: string
  startDate?: string
  endDate?: string
  description?: string
}

export const education: Education[] = [
  {
    degree: 'B.Tech in Mathematics and Computing',
    institution: 'Madhav Institute of Technology and Science',
    currentSemester: 3,
    sgpa: 8.21,
    status: 'Currently pursuing',
  },
  {
    degree: 'IIT Madras BS degree in DSA',
    institution: 'Indian Institute of Technology Madras',
    status: 'Currently pursuing',
    officialDegreeTitle: 'Pending verification',
  },
]
