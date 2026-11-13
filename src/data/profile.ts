export interface Profile {
  name: string
  firstName: string
  lastName: string
  role: string
  tagline: string
  introduction: string
  institution: string
  degree: string
  semester: number
  sgpa: number
  portrait: string
  email: string
  github: string
  linkedin: string
  resume: string
}

export const profile: Profile = {
  name: 'Pragyey Kumar Gour',
  firstName: 'Pragyey',
  lastName: 'Kumar Gour',
  role: 'AI Engineer & Software Developer',
  tagline: 'Building ideas into intelligent systems.',
  introduction:
    "I'm Pragyey Kumar Gour — a Mathematics and Computing undergraduate exploring the intersection of software engineering, artificial intelligence and computational problem-solving. I enjoy building technology, understanding complex systems and turning ideas into practical products.",
  institution: 'Madhav Institute of Technology and Science',
  degree: 'B.Tech in Mathematics and Computing',
  semester: 3,
  sgpa: 8.21,
  portrait: '/images/profile.png',
  email: '',
  github: '',
  linkedin: '',
  resume: '',
}
