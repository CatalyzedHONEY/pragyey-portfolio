
import { useRef } from 'react'
import { profile } from '../data/profile'
import { useSectionReveal } from '../hooks/useSectionReveal'

export default function About() {
  const rootRef = useRef<HTMLElement>(null)
  useSectionReveal(rootRef)

  return (
    <section
      ref={rootRef}
      id="about"
      className="scroll-mt-28 border-b border-white/10 py-28 md:py-36"
    >
      <div className="container">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-xs tracking-[0.3em] text-[#e5232d]">01 / ABOUT</span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div data-reveal="heading">
            <p className="editorial-font text-3xl italic text-white/50">
              Beyond the code.
            </p>
            <h2 className="display-font mt-5 text-6xl leading-[0.95] md:text-8xl">
              THINK
              <br />
              DIFFERENT.
              <span className="text-[#e5232d]">.</span>
            </h2>
          </div>

          <div
            data-reveal-stagger
            className="flex flex-col justify-center"
          >
            <p data-reveal="item" className="text-lg leading-8 text-white/80">
              {profile.introduction}
            </p>

            <p data-reveal="item" className="mt-8 text-sm leading-7 text-white/50">
              My interests span artificial intelligence, software engineering,
              mathematics, data science, research and technology entrepreneurship.
              I enjoy understanding complex systems and exploring how ideas can
              become practical technology.
            </p>

            <div
              data-reveal="item"
              className="mt-10 grid grid-cols-2 gap-6 border-t border-white/15 pt-8"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Academic background
                </p>
                <p className="mt-3 text-sm text-white/90">
                  Mathematics & Computing
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Current focus
                </p>
                <p className="mt-3 text-sm text-white/90">
                  AI & Software Engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
