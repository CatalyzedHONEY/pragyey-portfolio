import { useRef } from 'react'
import { useSkills } from '../hooks/useSkills'
import { useSectionReveal } from '../hooks/useSectionReveal'

export default function Skills() {
  const rootRef = useRef<HTMLElement>(null)
  const skills = useSkills()
  
  useSectionReveal(rootRef)

  if (skills.length === 0) {
    return (
      <section
        ref={rootRef}
        id="skills"
        className="scroll-mt-28 border-b border-white/10 py-28 md:py-36"
      >
        <div className="container">
          <div className="mb-12 flex items-center gap-4">
            <span className="text-xs tracking-[0.3em] text-[#e5232d]">
              04 / SKILLS
            </span>
            <div className="h-px flex-1 bg-white/15" />
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div data-reveal="heading">
              <p className="editorial-font text-3xl italic text-white/50">
                Tools in progress.
              </p>
              <h2 className="display-font mt-5 text-6xl leading-[0.95] md:text-8xl">
                CAPABILITIES
                <span className="text-[#e5232d]">.</span>
              </h2>
            </div>

            <div
              data-reveal-stagger
              className="flex flex-col justify-center border-l border-white/15 pl-0 lg:pl-12"
            >
              <p
                data-reveal="item"
                className="text-sm uppercase tracking-[0.22em] text-white/40"
              >
                Not yet catalogued
              </p>
              <p
                data-reveal="item"
                className="editorial-font mt-6 max-w-lg text-2xl italic text-white/60"
              >
                A verified skills inventory will appear here once confirmed.
                Nothing invented for presentation.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={rootRef}
      id="skills"
      className="scroll-mt-28 border-b border-white/10 py-28 md:py-36"
    >
      <div className="container">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-xs tracking-[0.3em] text-[#e5232d]">
            04 / SKILLS
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="mb-16" data-reveal="heading">
          <p className="editorial-font text-3xl italic text-white/50">
            Craft &amp; fluency.
          </p>
          <h2 className="display-font mt-5 text-6xl leading-[0.95] md:text-8xl">
            CAPABILITIES
            <span className="text-[#e5232d]">.</span>
          </h2>
        </div>

        <div data-reveal-stagger className="grid gap-12 md:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.category}
              data-reveal="item"
              className="border-t border-white/15 pt-8"
            >
              <h3 className="text-xs uppercase tracking-[0.22em] text-[#d6ad54]">
                {group.category}
              </h3>
              <ul className="mt-6 space-y-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border-b border-white/10 pb-3 text-sm text-white/80"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
