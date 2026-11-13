import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from '../lib/gsap'

export function useSectionReveal(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const headings = root.querySelectorAll('[data-reveal="heading"]')
        headings.forEach((heading) => {
          gsap.fromTo(
            heading,
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 88%',
                once: true,
              },
            },
          )
        })

        const groups = root.querySelectorAll('[data-reveal-stagger]')
        groups.forEach((group) => {
          const items = group.querySelectorAll('[data-reveal="item"]')
          if (!items.length) return

          gsap.fromTo(
            items,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 82%',
                once: true,
              },
            },
          )
        })

        root.querySelectorAll('[data-reveal="entry"]').forEach((entry) => {
          gsap.fromTo(
            entry,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: entry,
                start: 'top 86%',
                once: true,
              },
            },
          )
        })
      })
    }, root)

    return () => ctx.revert()
  }, [rootRef])
}
