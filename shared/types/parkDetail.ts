export interface ParkGalleryImage {
  url: string
  altText: string
}

export interface ParkFacilityStory {
  eyebrow: string
  title: string
  description: string
  imageUrl: string
  imageAltText: string
}

export interface ParkTestimonial {
  quote: string
  author: string
  context: string
}

export interface StructuredDataScript {
  type: 'application/ld+json'
  innerHTML: string
  [dataAttribute: `data-${string}`]: string | number | boolean | undefined
}
