
import { useLayoutEffect, useRef } from 'react'
import { profile } from '../data/profile'
import { gsap } from '../lib/gsap'

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const lastNameLead = profile.lastName.split(' ')[0]

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
        })

        tl.fromTo(
          '[data-hero="eyebrow"]',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
        )
          .fromTo(
            '[data-hero="line"]',
            { yPercent: 108 },
            { yPercent: 0, duration: 0.9, stagger: 0.12 },
            '-=0.25',
          )
          .fromTo(
            '[data-hero="copy"]',
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
            '-=0.4',
          )
          .fromTo(
            '[data-hero="cta"]',
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
            '-=0.35',
          )
          .fromTo(
            '[data-hero="portrait"]',
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.05, ease: 'power2.out' },
            '-=0.85',
          )
          .fromTo(
            '[data-hero="scroll"]',
            { opacity: 0 },
            { opacity: 1, duration: 0.55 },
            '-=0.35',
          )
      })

      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.to('[data-hero="parallax"]', {
            y: 64,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.7,
            },
          })
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden border-b border-white/10 pt-24"
    >
      <div className="container relative grid min-h-[85vh] items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">

        {/* Background editorial label */}
        <div
          data-hero="parallax"
          className="absolute right-0 top-12 hidden text-xs tracking-[0.3em] text-white/30 md:block"
        >
          INDEPENDENT THINKER / FUTURE BUILDER
        </div>

        {/* Text */}
        <div className="relative z-10 py-16">
          <p
            data-hero="eyebrow"
            className="mb-8 text-xs font-semibold uppercase tracking-[0.4em] text-[#e5232d]"
          >
            Mathematics × Technology × Intelligence
          </p>

          <h1 className="display-font text-[clamp(4rem,10vw,9rem)] leading-[0.85] tracking-tight">
            <span className="block overflow-hidden">
              <span data-hero="line" className="block">
                {profile.firstName}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero="line" className="block">
                {lastNameLead}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero="line" className="block">
                GOUR<span className="text-[#e5232d]">.</span>
              </span>
            </span>
          </h1>

          <p
            data-hero="copy"
            className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-white/80"
          >
            {profile.role}
          </p>

          <p
            data-hero="copy"
            className="editorial-font mt-5 max-w-md text-2xl italic text-white/60"
          >
            {profile.tagline}
          </p>

          <p
            data-hero="copy"
            className="mt-6 max-w-lg text-sm leading-7 text-white/50"
          >
            {profile.introduction}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              data-hero="cta"
              href="#projects"
              className="bg-[#e5232d] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
            >
              Explore Work ↗
            </a>

            <a
              data-hero="cta"
              href="#contact"
              className="border border-white/30 px-8 py-4 text-xs font-semibold uppercase tracking-widest transition hover:border-[#e5232d] hover:text-[#e5232d]"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative mx-auto flex w-full max-w-[540px] items-end justify-center">
          <div
            data-hero="parallax"
            className="absolute bottom-10 h-[65%] w-[75%] bg-[#e5232d]/10 blur-3xl"
          />

          <div
            data-hero="parallax"
            className="absolute right-0 top-10 z-0 font-display text-[clamp(5rem,12vw,12rem)] leading-none text-white/[0.035]"
          >
            PKG
          </div>

          <img
            data-hero="portrait"
            src={profile.portrait}
            alt="Pragyey Kumar Gour"
            className="relative z-10 max-h-[78vh] w-auto max-w-full object-contain object-bottom"
          />
        </div>
      </div>

      <div
        data-hero="scroll"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-white/40 md:block"
      >
        Scroll to explore ↓
      </div>
    </section>
  )
}
