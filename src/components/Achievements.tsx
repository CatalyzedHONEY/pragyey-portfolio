import { useRef, useState } from 'react'
import type { Achievement } from '../data/achievements'
import { useAchievements } from '../hooks/useAchievements'
import { useSectionReveal } from '../hooks/useSectionReveal'

function CertificateImage({ achievement }: { achievement: Achievement }) {
  const [failed, setFailed] = useState(false)

  if (!achievement.certificateImage || failed) return null

  return (
    <img
      src={achievement.certificateImage}
      alt={`${achievement.title} certificate`}
      className="mt-6 max-h-56 w-full border border-white/10 object-contain"
      onError={() => setFailed(true)}
    />
  )
}

export default function Achievements() {
  const rootRef = useRef<HTMLElement>(null)
  const { entries, settled } = useAchievements()
  useSectionReveal(rootRef, settled ? entries.length + 1 : 0)

  return (
    <section
      ref={rootRef}
      id="achievements"
      className="scroll-mt-28 border-b border-white/10 py-28 md:py-36"
    >
      <div className="container">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-xs tracking-[0.3em] text-[#e5232d]">
            06 / ACHIEVEMENTS
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal="heading">
            <p className="editorial-font text-3xl italic text-white/50">
              On the record.
            </p>
            <h2 className="display-font mt-5 text-6xl leading-[0.95] md:text-8xl">
              ACHIEVEMENTS
              <span className="text-[#e5232d]">.</span>
            </h2>
          </div>
          <p
            data-reveal="heading"
            className="max-w-xl self-end text-sm leading-7 text-white/50"
          >
            Credentials and recognition published from the studio. Nothing is
            listed until it is confirmed.
          </p>
        </div>

        {settled && entries.length === 0 ? (
          <div data-reveal-stagger className="border-t border-white/15 pt-12">
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
              Achievements will appear here once they are published. Nothing
              is invented for presentation.
            </p>
          </div>
        ) : (
          <ol>
            {entries.map((item, index) => (
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
                  {item.date && (
                    <p className="text-xs uppercase tracking-[0.22em] text-[#d6ad54]">
                      {item.date}
                    </p>
                  )}
                  <h3 className="display-font mt-4 text-3xl leading-none md:text-4xl">
                    {item.title}
                  </h3>
                  {item.issuer && (
                    <p className="editorial-font mt-4 text-xl italic text-white/60">
                      {item.issuer}
                    </p>
                  )}
                </div>

                <div className="lg:content-start">
                  {item.description && (
                    <p className="text-sm leading-7 text-white/60">
                      {item.description}
                    </p>
                  )}

                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-block border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-widest transition duration-300 hover:border-[#e5232d] hover:text-[#e5232d]"
                    >
                      Credential ↗
                    </a>
                  )}

                  <CertificateImage achievement={item} />
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}
