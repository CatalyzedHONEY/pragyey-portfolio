
import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity'
import { projects as fallbackProjects, type Project } from '../data/projects'
import { urlFor } from '../lib/sanity'

interface SanityProject {
  _id: string
  title: string
  shortDescription?: string
  description?: Array<{
    _type: string
    children?: Array<{ text?: string }>
  }> | string
  coverImage?: {
    asset?: {
      _ref: string
    }
  }
  technologies?: string[]
  githubUrl?: string
  liveDemoUrl?: string
  status?: string
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)

  useEffect(() => {
    let active = true

    sanityClient
      .fetch<SanityProject[]>(`
        *[_type == "project"] | order(order asc) {
          _id,
          title,
          shortDescription,
          description,
          coverImage,
          technologies,
          githubUrl,
          liveDemoUrl,
          status
        }
      `)
      .then((data) => {
        if (!active || !data || data.length === 0) return

        const mappedProjects: Project[] = data.map((item) => {
          const description =
            typeof item.description === 'string'
              ? item.description
              : item.description
                  ?.flatMap((block) =>
                    block.children?.map((child) => child.text ?? '') ?? [],
                  )
                  .join(' ') ?? item.shortDescription ?? ''

          return {
            id: item._id,
            title: item.title,
            description,
            coverImage: item.coverImage
              ? urlFor(item.coverImage).width(1200).url()
              : '',
            technologies: item.technologies ?? [],
            github: item.githubUrl ?? '',
            liveDemo: item.liveDemoUrl ?? '',
            status: item.status ?? 'Status to be verified.',
          }
        })

        setProjects(mappedProjects)
      })
      .catch((error) => {
        console.error('Unable to load Sanity projects:', error)
      })

    return () => {
      active = false
    }
  }, [])

  return projects
}
