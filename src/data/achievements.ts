export interface Achievement {
  id: string
  title: string
  issuer: string
  description: string
  date: string
  credentialUrl: string
  type: string
}

export const achievements: Achievement[] = []
