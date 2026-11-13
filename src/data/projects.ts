export interface Project {
  id: string
  title: string
  description: string
  status: string
  coverImage: string
  technologies: string[]
  github: string
  liveDemo: string
}

export const projects: Project[] = [
  {
    id: 'clinic-os',
    title: 'Clinic OS',
    description:
      'Multi-tenant clinic management and queue-management SaaS concept/project.',
    status: 'Status to be verified.',
    coverImage: '/images/projects/clinic-os.png',
    technologies: [],
    github: '',
    liveDemo: '',
  },
  {
    id: 'ai-ocean-temperature-reconstruction',
    title: 'AI Ocean Temperature Reconstruction',
    description:
      'AI-based subsurface ocean temperature reconstruction project associated with broader AI water intelligence work.',
    status: 'Status to be verified.',
    coverImage: '/images/projects/ai-ocean-temperature-reconstruction.png',
    technologies: [],
    github: '',
    liveDemo: '',
  },
  {
    id: 'gym-growth-saas',
    title: 'Gym Growth SaaS',
    description:
      'Gym engagement and growth platform involving QR-based attendance, streaks and member engagement.',
    status: 'Status to be verified.',
    coverImage: '/images/projects/gym-growth-saas.png',
    technologies: [],
    github: '',
    liveDemo: '',
  },
]
