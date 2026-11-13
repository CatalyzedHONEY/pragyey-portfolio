import { useRef } from 'react'
import type { Experience as ExperienceEntry } from '../data/experience'
import { useExperience } from '../hooks/useExperience'
import { useSectionReveal } from '../hooks/useSectionReveal'

function experiencePeriod(item: ExperienceEntry) {
  if (item.startDate && item.endDate) return `${item.startDate} — ${item.endDate}`
  if (item.startDate && item.currentlyWorking) return `${item.startDate} — Present`
  if (item.startDate) return item.startDate
  if (item.endDate) return item.endDate
  if (item.currentlyWorking) return 'Present'
  return undefined
}

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null)
  const { entries, settled } = useExperience()
  useSectionReveal(rootRef, settled ? entries.length + 1 : 0)

  return (
    <section
      ref={rootRef}
      id="experience"
      className="scroll-mt-28 border-b border-white/10 py-28 md:py-36"
    >
      <div className="container">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-xs tracking-[0.3em] text-[#e5232d]">
            03 / EXPERIENCE
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal="heading">
            <p className="editorial-font text-3xl italic text-white/50">
              Work on record.
            </p>
            <h2 className="display-font mt-5 text-6xl leading-[0.95] md:text-8xl">
              EXPERIENCE
              <span className="text-[#e5232d]">.</span>
            </h2>
          </div>
          <p
            data-reveal="heading"
            className="max-w-xl self-end text-sm leading-7 text-white/50"
          >
            Roles and collaborations published from the studio. Unpublished
            work stays off this page.
          </p>
        </div>

        {settled && entries.length === 0 ? (
          <div
            data-reveal-stagger
            className="border-t border-white/15 pt-12"
          >
            <p
              data-reveal="item"
              className="text-sm uppercase tracking-[0.22em] text-white/40"
            >
              Not yet published
            </p>
            <p
              data-reveal="item"
              className="editorial-font mt-6 max-w-lg text-2xl italic text-white/60"
            >
              Experience will appear here once it is published. Nothing is
              added for presentation.
            </p>
          </div>
        ) : (
          <ol className="relative space-y-0">
            {entries.map((item, index) => {
              const period = experiencePeriod(item)

              return (
                <li
                  key={item.id}
                  data-reveal="entry"
                  className="grid gap-6 border-t border-white/15 py-12 lg:grid-cols-[120px_1fr_1.2fr]"
                >
                  <div className="flex items-start gap-3">
                    <span className="display-font text-4xl text-white/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="mt-2 hidden h-2 w-2 shrink-0 bg-[#d6ad54] lg:block"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    {item.employmentType && (
                      <p className="text-xs uppercase tracking-[0.22em] text-[#d6ad54]">
                        {item.employmentType}
                      </p>
                    )}
                    <h3 className="display-font mt-4 text-3xl leading-none md:text-4xl">
                      {item.role || item.organization}
                    </h3>
                    {item.role && (
                      <p className="editorial-font mt-4 text-xl italic text-white/60">
                        {item.organization}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-6 lg:content-start">
                    {period && (
                      <div className="border-l border-white/15 pl-5">
                        <p className="text-xs uppercase tracking-widest text-white/40">
                          Dates
                        </p>
                        <p className="mt-3 text-sm text-white/90">{period}</p>
                      </div>
                    )}

                    {item.description && (
                      <p className="text-sm leading-7 text-white/60">
                        {item.description}
                      </p>
                    )}

                    {item.technologies && item.technologies.length > 0 && (
                      <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-6">
                        {item.technologies.map((technology) => (
                          <li
                            key={technology}
                            className="text-xs uppercase tracking-[0.16em] text-white/50"
                          >
                            {technology}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </section>
  )
}
