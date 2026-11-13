
import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'qpi7p311',
  dataset: 'production',
  apiVersion: '2025-02-19',
  useCdn: true,
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: Parameters<typeof builder.image>[0]) {
    return builder.image(source).auto('format')
  }
