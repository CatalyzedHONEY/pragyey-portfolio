import { useRef, useState } from 'react'
import { useProjects } from '../hooks/useProjects'
import type { Project } from '../data/projects'
import { useSectionReveal } from '../hooks/useSectionReveal'

function ProjectCover({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="group relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#171717]">
      {!failed && (
        <img
          src={project.coverImage}
          alt={`${project.title} cover`}
          className="relative z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          onError={() => setFailed(true)}
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-between p-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          {failed ? 'Replaceable cover image' : ''}
        </span>
        <span className="display-font text-5xl text-white/[0.08] transition-transform duration-700 ease-out group-hover:translate-y-[-4px] md:text-7xl">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null)
  const projects = useProjects()
  useSectionReveal(rootRef)

  return (
    <section
      ref={rootRef}
      id="projects"
      className="scroll-mt-28 border-b border-white/10 py-28 md:py-36"
    >
      <div className="container">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-xs tracking-[0.3em] text-[#e5232d]">
            05 / PROJECTS
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="mb-20 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div data-reveal="heading">
            <p className="editorial-font text-3xl italic text-white/50">
              Selected work.
            </p>
            <h2 className="display-font mt-5 text-6xl leading-[0.95] md:text-8xl">
              PROJECTS
              <span className="text-[#e5232d]">.</span>
            </h2>
          </div>
          <p
            data-reveal="heading"
            className="max-w-xl self-end text-sm leading-7 text-white/50"
          >
            Concepts and systems under development. Status labels reflect what
            is currently known — completion is not assumed.
          </p>
        </div>

        <div className="space-y-0">
          {projects.map((project, index) => {
            const hasGithub = Boolean(project.github.trim())
            const hasLiveDemo = Boolean(project.liveDemo.trim())
            const hasTechnologies = project.technologies.length > 0
            const isReversed = index % 2 === 1

            return (
              <article
                key={project.id}
                data-reveal="entry"
                className="grid gap-10 border-t border-white/15 py-16 lg:grid-cols-2 lg:gap-16"
              >
                <div className={isReversed ? 'lg:order-2' : ''}>
                  <ProjectCover project={project} index={index} />
                </div>

                <div
                  className={`flex flex-col justify-center ${
                    isReversed ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-xs uppercase tracking-[0.22em] text-[#d6ad54]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="border border-[#e5232d]/50 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#e5232d] transition-colors duration-300">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="display-font mt-6 text-4xl leading-none md:text-5xl">
                    {project.title}
                  </h3>

                  <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
                    {project.description}
                  </p>

                  {hasTechnologies && (
                    <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-6">
                      {project.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="text-xs uppercase tracking-[0.16em] text-white/50"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}

                  {(hasGithub || hasLiveDemo) && (
                    <div className="mt-8 flex flex-wrap gap-4">
                      {hasGithub && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-widest transition duration-300 hover:border-[#e5232d] hover:text-[#e5232d]"
                        >
                          GitHub ↗
                        </a>
                      )}
                      {hasLiveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#e5232d] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition duration-300 hover:bg-white hover:text-black"
                        >
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
