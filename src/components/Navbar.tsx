
import { useState } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

const navLinkClass =
  'relative text-xs uppercase tracking-[0.18em] text-white/70 transition-colors duration-300 hover:text-[#e5232d] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#e5232d] after:transition-[width] after:duration-300 hover:after:w-full'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#090909]/90 backdrop-blur-md">
      <nav className="container flex h-20 items-center justify-between">
        <a
          href="#home"
          className="display-font text-2xl tracking-wide transition-opacity duration-300 hover:opacity-80"
        >
          PKG<span className="text-[#e5232d]">.</span>
        </a>

        <div className="hidden items-center gap-5 lg:flex xl:gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xs uppercase tracking-widest transition-colors duration-300 hover:text-[#e5232d] lg:hidden"
        >
          {menuOpen ? 'Close −' : 'Menu +'}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#090909] px-6 py-8 lg:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-white/10 py-4 text-sm uppercase tracking-widest transition-colors duration-300 hover:text-[#e5232d]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
