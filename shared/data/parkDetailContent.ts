import type { ParkFacilityStory, ParkGalleryImage, ParkTestimonial } from '../types/parkDetail'

const deVersGalleryImages: ParkGalleryImage[] = [
  {
    url: 'https://mss-p-014-delivery.stylelabs.cloud/api/public/content/4859064-3x2?t=cw800',
    altText: 'Bosrijk vakantiepark Landal De Vers in Overloon',
  },
  {
    url: 'https://mss-p-014-delivery.stylelabs.cloud/api/public/content/7457006-3x2?t=w430',
    altText: 'Terras en buitenruimte bij Landal De Vers',
  },
  {
    url: 'https://mss-p-014-delivery.stylelabs.cloud/api/public/content/7456688-3x2?t=w430',
    altText: 'Groene omgeving en faciliteiten op Landal De Vers',
  },
  {
    url: 'https://mss-p-014-delivery.stylelabs.cloud/api/public/content/7888140-3x2?t=w430',
    altText: 'Bungalow op Landal De Vers tussen het groen',
  },
]

const deVersFacilityStories: ParkFacilityStory[] = [
  {
    eyebrow: 'Natuur naast het park',
    title: 'Wandelen door bos en duinen',
    description: 'Vanaf het park zit je snel tussen bos, heide en zand. Ideaal voor een rustige ochtendwandeling of een picknick met kinderen.',
    imageUrl: 'https://mss-p-014-delivery.stylelabs.cloud/api/public/content/3955071-4x3?t=w1024',
    imageAltText: 'Wandel- en fietsomgeving bij Landal De Vers',
  },
  {
    eyebrow: 'Zwemmen',
    title: 'Overdekt zwembad voor elk weer',
    description: 'Ook als het regent blijft het weekend makkelijk: zwemmen, spetteren en daarna weer ontspannen op het park.',
    imageUrl: 'https://mss-p-014-delivery.stylelabs.cloud/api/public/content/7456777-4x3?t=w1024',
    imageAltText: 'Zwembadfaciliteit op Landal De Vers',
  },
  {
    eyebrow: 'Kinderen blij',
    title: 'Spelen, bouwen en buiten ravotten',
    description: 'Met creatieve activiteiten, speelplekken en sportieve opties is er genoeg om de dag luchtig te vullen.',
    imageUrl: 'https://mss-p-014-delivery.stylelabs.cloud/api/public/content/7455687-4x3?t=w1024',
    imageAltText: 'Speelvoorzieningen en vernieuwde faciliteiten op Landal De Vers',
  },
  {
    eyebrow: 'Eten en drinken',
    title: 'Makkelijk eten zonder plannen',
    description: 'Fijn voor aankomst, lunch op het terras of een ontspannen avond waarop niemand hoeft te koken.',
    imageUrl: 'https://mss-p-014-delivery.stylelabs.cloud/api/public/content/7456121-4x3?t=w1024',
    imageAltText: 'Eten en drinken op Landal De Vers',
  },
]

const deVersTestimonials: ParkTestimonial[] = [
  {
    quote: 'We wilden vooral rust, maar voor de kinderen moest er ook iets te doen zijn. Die combinatie voelde hier precies goed.',
    author: 'Familie uit Utrecht',
    context: 'Voorbeeldreview voor een gezinsweekend',
  },
  {
    quote: 'Binnen tien minuten waren we geland: huisje open, schoenen uit en daarna meteen het groen in.',
    author: 'Sanne en Joost',
    context: 'Voorbeeldreview voor een kort verblijf',
  },
  {
    quote: 'De prijsvoorbeelden hielpen ons snel kiezen. Daarna hebben we bij Landal de actuele beschikbaarheid gecontroleerd.',
    author: 'Marlies',
    context: 'Voorbeeldreview voor vergelijken en boeken',
  },
]

export const getParkGalleryImagesForSlug = (slug: string, fallbackImage: ParkGalleryImage): ParkGalleryImage[] => {
  if (slug === 'landal-de-vers') {
    return deVersGalleryImages
  }

  return [fallbackImage]
}

export const listParkFacilityStoriesForSlug = (slug: string): ParkFacilityStory[] => {
  if (slug === 'landal-de-vers') {
    return deVersFacilityStories
  }

  return []
}

export const listParkTestimonialsForSlug = (slug: string): ParkTestimonial[] => {
  if (slug === 'landal-de-vers') {
    return deVersTestimonials
  }

  return []
}
