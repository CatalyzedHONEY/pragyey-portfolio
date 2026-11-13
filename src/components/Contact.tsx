import { useRef } from 'react'
import { profile } from '../data/profile'
import { useSectionReveal } from '../hooks/useSectionReveal'

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null)
  useSectionReveal(rootRef)

  const email = profile.email.trim()
  const github = profile.github.trim()
  const linkedin = profile.linkedin.trim()
  const resume = profile.resume.trim()

  const socialLinks = [
    github ? { label: 'GitHub', href: github } : null,
    linkedin ? { label: 'LinkedIn', href: linkedin } : null,
    resume ? { label: 'Resume', href: resume } : null,
  ].filter((link): link is { label: string; href: string } => link !== null)

  return (
    <section
      ref={rootRef}
      id="contact"
      className="scroll-mt-28 border-b border-white/10 py-28 md:py-36"
    >
      <div className="container">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-xs tracking-[0.3em] text-[#e5232d]">
            07 / CONTACT
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal="heading">
            <p className="editorial-font text-3xl italic text-white/50">
              Start a conversation.
            </p>
            <h2 className="display-font mt-5 text-6xl leading-[0.95] md:text-8xl">
              LET&apos;S
              <br />
              CONNECT
              <span className="text-[#e5232d]">.</span>
            </h2>
            <p className="mt-8 max-w-md text-sm leading-7 text-white/50">
              Open to thoughtful collaborations, research discussions and
              opportunities in AI and software engineering.
            </p>
          </div>

          <div
            data-reveal-stagger
            className="flex flex-col justify-center space-y-10 border-t border-white/15 pt-10 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0"
          >
            <div data-reveal="item">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Professional email
              </p>
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="mt-4 block text-lg text-white/90 transition duration-300 hover:text-[#e5232d]"
                >
                  {email}
                </a>
              ) : (
                <p className="editorial-font mt-4 text-xl italic text-white/45">
                  Email to be added
                </p>
              )}
            </div>

            <div data-reveal="item">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Professional links
              </p>
              {socialLinks.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm uppercase tracking-[0.18em] text-white/80 transition duration-300 hover:text-[#e5232d]"
                      >
                        {link.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="editorial-font mt-4 text-xl italic text-white/45">
                  Social profiles forthcoming
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
