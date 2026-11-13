import { useRef } from 'react'
import { education } from '../data/education'
import { useSectionReveal } from '../hooks/useSectionReveal'

export default function Education() {
  const rootRef = useRef<HTMLElement>(null)
  useSectionReveal(rootRef)

  return (
    <section
      ref={rootRef}
      id="education"
      className="scroll-mt-28 border-b border-white/10 py-28 md:py-36"
    >
      <div className="container">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-xs tracking-[0.3em] text-[#e5232d]">
            02 / EDUCATION
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal="heading">
            <p className="editorial-font text-3xl italic text-white/50">
              Formed by rigor.
            </p>
            <h2 className="display-font mt-5 text-6xl leading-[0.95] md:text-8xl">
              ACADEMIC
              <br />
              PATH
              <span className="text-[#e5232d]">.</span>
            </h2>
          </div>

          <p
            data-reveal="heading"
            className="max-w-xl self-end text-sm leading-7 text-white/50"
          >
            Verified academic qualifications and current pursuits. Details that
            remain pending verification are marked clearly.
          </p>
        </div>

        <ol className="relative space-y-0">
          {education.map((item, index) => (
            <li
              key={`${item.institution}-${item.degree}`}
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
                <p className="text-xs uppercase tracking-[0.22em] text-[#d6ad54]">
                  {item.status}
                </p>
                <h3 className="display-font mt-4 text-3xl leading-none md:text-4xl">
                  {item.degree}
                </h3>
                <p className="editorial-font mt-4 text-xl italic text-white/60">
                  {item.institution}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:content-start">
                {item.currentSemester != null && (
                  <div className="border-l border-white/15 pl-5">
                    <p className="text-xs uppercase tracking-widest text-white/40">
                      Current semester
                    </p>
                    <p className="mt-3 text-sm text-white/90">
                      Semester {item.currentSemester}
                    </p>
                  </div>
                )}

                {item.sgpa != null && (
                  <div className="border-l border-white/15 pl-5">
                    <p className="text-xs uppercase tracking-widest text-white/40">
                      SGPA
                    </p>
                    <p className="mt-3 text-sm text-white/90">{item.sgpa}</p>
                  </div>
                )}

                {item.officialDegreeTitle && (
                  <div className="border-l border-[#e5232d]/40 pl-5 sm:col-span-2">
                    <p className="text-xs uppercase tracking-widest text-white/40">
                      Official degree title
                    </p>
                    <p className="mt-3 text-sm text-white/70">
                      {item.officialDegreeTitle}
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
