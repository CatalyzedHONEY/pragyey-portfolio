import { profile } from '../data/profile'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const professionalLinks = [
    profile.email.trim()
      ? { label: 'Email', href: `mailto:${profile.email.trim()}` }
      : null,
    profile.github.trim()
      ? { label: 'GitHub', href: profile.github.trim() }
      : null,
    profile.linkedin.trim()
      ? { label: 'LinkedIn', href: profile.linkedin.trim() }
      : null,
    profile.resume.trim()
      ? { label: 'Resume', href: profile.resume.trim() }
      : null,
  ].filter((link): link is { label: string; href: string } => link !== null)

  return (
    <footer className="border-t border-white/10 py-16 md:py-20">
      <div className="container">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <a href="#home" className="display-font text-3xl tracking-wide">
              PKG<span className="text-[#e5232d]">.</span>
            </a>
            <p className="editorial-font mt-5 max-w-sm text-xl italic text-white/50">
              {profile.tagline}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/40">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-[#e5232d]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/40">
              Professional
            </p>
            {professionalLinks.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {professionalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith('mailto:')
                        ? {}
                        : { target: '_blank', rel: 'noopener noreferrer' })}
                      className="text-sm text-white/70 transition hover:text-[#e5232d]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-white/40">
                Links will appear once published.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-white/40">
            © {year} {profile.name}
          </p>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
            Mathematics × Technology × Intelligence
          </p>
        </div>
      </div>
    </footer>
  )
}
