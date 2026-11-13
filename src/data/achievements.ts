export interface Achievement {
  id: string
  title: string
  issuer?: string
  date?: string
  description?: string
  credentialUrl?: string
  certificateImage?: string
}

export const achievements: Achievement[] = []
