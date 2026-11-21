
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sanityClient, urlFor } from '../lib/sanity'

interface Profile {
  fullName?: string
  role?: string
  tagline?: string
  bio?: string
  portrait?: {
    asset?: {
      _ref: string
    }
  }
  email?: string
  github?: string
  linkedin?: string
  location?: string
  availability?: string
}

const studioUrl = (
  import.meta.env.VITE_SANITY_STUDIO_URL || 'https://pragyey-portfolio.sanity.studio'
).replace(/\/$/, '')

const sections = [
  {
    name: 'Profile',
    description: 'Identity, biography and social links',
    type: 'profile',
  },
  {
    name: 'Projects',
    description: 'Projects, case studies and demos',
    type: 'project',
  },
  {
    name: 'Skills',
    description: 'Technical capabilities',
    type: 'skill',
  },
  {
    name: 'Education',
    description: 'Academic records',
    type: 'education',
  },
  {
    name: 'Experience',
    description: 'Professional experience',
    type: 'experience',
  },
  {
    name: 'Achievements',
    description: 'Awards and credentials',
    type: 'achievement',
  },
]

export default function Admin() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    let active = true

    sanityClient
      .fetch<Profile | null>(`
        *[_type == "profile"][0] {
          fullName,
          role,
          tagline,
          bio,
          portrait,
          email,
          github,
          linkedin,
          location,
          availability
        }
      `)
      .then((data) => {
        if (!active) return
        setProfile(data)
        setConnected(true)
      })
      .catch((error) => {
        console.error('Unable to load admin profile:', error)
        if (active) setConnected(false)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const portraitUrl = profile?.portrait?.asset?._ref
    ? urlFor(profile.portrait).width(180).height(180).url()
    : '/images/profile.png'

  return (
    <main className="min-h-screen bg-[#101010] px-6 py-10 text-[#f3f0e9] md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-8">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#e5232d]">
              PORTFOLIO CONTROL CENTER
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
              PKG / ADMIN<span className="text-[#e5232d]">.</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="border border-white/20 px-5 py-3 text-xs uppercase tracking-widest transition hover:border-[#e5232d]"
            >
              View portfolio ↗
            </Link>

            <a
              href="/api/admin-auth?action=logout"
              className="border border-white/20 px-5 py-3 text-xs uppercase tracking-widest transition hover:border-[#e5232d] hover:text-[#e5232d]"
            >
              Logout ↗
            </a>
          </div>
        </header>

        {/* Content management heading */}
        <section className="flex flex-wrap items-center justify-between gap-4 py-8">
          <div>
            <p className="text-xs tracking-[0.25em] text-[#d6ad54]">
              CONTENT MANAGEMENT
            </p>

            <h2 className="mt-3 text-2xl md:text-3xl">
              Manage your portfolio
            </h2>
          </div>

          <span className="border border-white/10 px-4 py-2 text-xs">
            <span className={connected ? 'text-green-400' : 'text-yellow-400'}>
              ● {loading ? 'CONNECTING' : connected ? 'CMS CONNECTED' : 'CONNECTION ISSUE'}
            </span>
          </span>
        </section>

        {/* Profile overview */}
        <section className="mb-12 border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-wrap items-start gap-6">

            <img
              src={portraitUrl}
              alt="Profile portrait"
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = '/images/profile.png'
              }}
              className="h-24 w-24 rounded-full border border-white/10 object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="text-xs tracking-[0.2em] text-[#d6ad54]">
                PROFILE OVERVIEW
              </p>

              {loading ? (
                <p className="mt-4 text-sm text-white/50">
                  Loading profile...
                </p>
              ) : profile ? (
                <>
                  <h3 className="mt-3 text-2xl font-semibold">
                    {profile.fullName || 'Name not set'}
                  </h3>

                  <p className="mt-1 text-sm text-white/55">
                    {profile.role || 'Role not set'}
                  </p>

                  <p className="mt-3 text-sm text-white/65">
                    {profile.tagline || 'No tagline added'}
                  </p>

                  <p className="mt-3 text-xs text-white/35">
                    {profile.email || 'No email added'}
                    {profile.location ? ` · ${profile.location}` : ''}
                  </p>
                </>
              ) : (
                <p className="mt-4 text-sm text-white/50">
                  No published profile found. Create or publish one in Sanity Studio.
                </p>
              )}
            </div>

            <a
              href={`${studioUrl}/structure/profile`}
              target="_blank"
              rel="noreferrer"
              className="border border-[#e5232d]/60 px-5 py-3 text-xs uppercase tracking-widest text-[#e5232d] transition hover:bg-[#e5232d] hover:text-white"
            >
              Edit profile ↗
            </a>
          </div>

          {profile?.bio && (
            <p className="mt-6 max-w-3xl border-t border-white/10 pt-5 text-sm leading-7 text-white/50">
              {profile.bio}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/50">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            )}

            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            )}

            {profile?.availability && (
              <span>{profile.availability}</span>
            )}
          </div>
        </section>

        {/* Management modules */}
        <section>
          <div className="mb-6">
            <p className="text-xs tracking-[0.25em] text-[#d6ad54]">
              MANAGEMENT MODULES
            </p>

            <h2 className="mt-3 text-2xl">
              Your content
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => (
              <a
                key={section.type}
                href={`${studioUrl}/structure/${section.type}`}
                target="_blank"
                rel="noreferrer"
                className="group border border-white/10 bg-white/[0.02] p-7 transition hover:border-[#e5232d]/60 hover:bg-white/[0.04]"
              >
                <p className="text-xs tracking-widest text-[#d6ad54]">
                  0{index + 1}
                </p>

                <h3 className="mt-8 text-xl font-semibold">
                  {section.name}
                </h3>

                <p className="mt-3 text-sm text-white/45">
                  {section.description}
                </p>

                <p className="mt-7 text-xs uppercase tracking-widest text-[#e5232d]">
                  Manage {section.name} ↗
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 pt-6 text-xs text-white/30">
          PRAGYEY KUMAR GOUR · PORTFOLIO ADMIN
        </footer>

      </div>
    </main>
  )
}
