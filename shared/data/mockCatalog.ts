import type {
  AffiliateLinkTemplateRecord,
  CatalogDataSet,
  FacilityRecord,
  ParkFacilityRecord,
  ParkRecord,
  PriceSnapshotRecord,
  RegionRecord,
} from '../types/database'

const importedAt = '2026-05-19T12:00:00.000Z'
const createdAt = '2026-05-19T12:00:00.000Z'

export const mockRegions: RegionRecord[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    slug: 'veluwe',
    name: 'Veluwe',
    countryCode: 'NL',
    seoTitle: 'Landal-parken op de Veluwe',
    seoDescription: 'Vergelijk Landal-parken op de Veluwe voor een weekendje weg.',
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    slug: 'kust',
    name: 'Kust',
    countryCode: 'NL',
    seoTitle: 'Landal-parken aan de kust',
    seoDescription: 'Vergelijk Landal-parken aan de Nederlandse kust.',
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    slug: 'limburg',
    name: 'Limburg',
    countryCode: 'NL',
    seoTitle: 'Landal-parken in Limburg',
    seoDescription: 'Vergelijk Landal-parken in Limburg voor een korte vakantie.',
    createdAt,
    updatedAt: createdAt,
  },
]

export const mockFacilities: FacilityRecord[] = [
  {
    id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    slug: 'zwembad',
    name: 'Zwembad',
    sourceKey: 'pool',
  },
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    slug: 'wellness',
    name: 'Wellness',
    sourceKey: 'wellness',
  },
  {
    id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    slug: 'hond-welkom',
    name: 'Hond welkom',
    sourceKey: 'pets_allowed',
  },
]

export const mockParks: ParkRecord[] = [
  {
    id: '44444444-4444-4444-8444-444444444444',
    slug: 'landal-miggelenberg',
    name: 'Landal Miggelenberg',
    locationName: 'Hoenderloo',
    regionId: '11111111-1111-4111-8111-111111111111',
    countryCode: 'NL',
    description: 'Voorbeeldpark op de Veluwe met bosrijke ligging en prijscontext zonder beschikbaarheidsclaim.',
    highlights: ['Bosrijke ligging', 'Familievriendelijk', 'Natuur dichtbij'],
    visualPlaceholderKey: 'forest',
    sourceUrl: 'https://www.landal.nl/parken/miggelenberg',
    landalParkCode: 'miggelenberg',
    lastImportedAt: importedAt,
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: '55555555-5555-4555-8555-555555555555',
    slug: 'landal-strand-resort-ouddorp-duin',
    name: 'Landal Strand Resort Ouddorp Duin',
    locationName: 'Ouddorp',
    regionId: '22222222-2222-4222-8222-222222222222',
    countryCode: 'NL',
    description: 'Voorbeeldpark aan de kust voor de eerste mock-catalogus.',
    highlights: ['Dicht bij strand', 'Ruime accommodaties', 'Fietsomgeving'],
    visualPlaceholderKey: 'coast',
    sourceUrl: 'https://www.landal.nl/parken/strand-resort-ouddorp-duin',
    landalParkCode: 'strand-resort-ouddorp-duin',
    lastImportedAt: importedAt,
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: '66666666-6666-4666-8666-666666666666',
    slug: 'landal-hoog-vaals',
    name: 'Landal Hoog Vaals',
    locationName: 'Vaals',
    regionId: '33333333-3333-4333-8333-333333333333',
    countryCode: 'NL',
    description: 'Voorbeeldpark in Limburg met heuvelachtige omgeving.',
    highlights: ['Heuvelland', 'Binnenzwembad', 'Dicht bij Maastricht'],
    visualPlaceholderKey: 'hills',
    sourceUrl: 'https://www.landal.nl/parken/hoog-vaals',
    landalParkCode: 'hoog-vaals',
    lastImportedAt: importedAt,
    createdAt,
    updatedAt: createdAt,
  },
]

export const mockParkFacilities: ParkFacilityRecord[] = [
  {
    parkId: '44444444-4444-4444-8444-444444444444',
    facilityId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  },
  {
    parkId: '44444444-4444-4444-8444-444444444444',
    facilityId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  },
  {
    parkId: '55555555-5555-4555-8555-555555555555',
    facilityId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  },
  {
    parkId: '66666666-6666-4666-8666-666666666666',
    facilityId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  },
  {
    parkId: '66666666-6666-4666-8666-666666666666',
    facilityId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  },
]

export const mockPriceSnapshots: PriceSnapshotRecord[] = [
  {
    id: '77777777-7777-4777-8777-777777777777',
    parkId: '44444444-4444-4444-8444-444444444444',
    arrivalDate: '2026-06-05',
    departureDate: '2026-06-08',
    adultCount: 2,
    childCount: 0,
    currency: 'EUR',
    priceAmount: 399,
    priceLabel: 'Prijsvoorbeeld',
    sourceCapturedAt: importedAt,
    expiresAt: '2026-05-20T12:00:00.000Z',
    createdAt,
  },
  {
    id: '88888888-8888-4888-8888-888888888888',
    parkId: '55555555-5555-4555-8555-555555555555',
    arrivalDate: '2026-06-05',
    departureDate: '2026-06-08',
    adultCount: 2,
    childCount: 2,
    currency: 'EUR',
    priceAmount: 549,
    priceLabel: 'Prijsvoorbeeld',
    sourceCapturedAt: importedAt,
    expiresAt: '2026-05-20T12:00:00.000Z',
    createdAt,
  },
  {
    id: '99999999-9999-4999-8999-999999999999',
    parkId: '66666666-6666-4666-8666-666666666666',
    arrivalDate: '2026-06-12',
    departureDate: '2026-06-15',
    adultCount: 2,
    childCount: 1,
    currency: 'EUR',
    priceAmount: 429,
    priceLabel: 'Prijsvoorbeeld',
    sourceCapturedAt: importedAt,
    expiresAt: '2026-05-20T12:00:00.000Z',
    createdAt,
  },
]

export const mockAffiliateLinkTemplates: AffiliateLinkTemplateRecord[] = [
  {
    id: '12121212-1212-4121-8121-121212121212',
    parkId: '44444444-4444-4444-8444-444444444444',
    baseUrl: 'https://www.landal.nl/parken/miggelenberg',
    trackingTemplate: null,
    status: 'placeholder',
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: '13131313-1313-4131-8131-131313131313',
    parkId: '55555555-5555-4555-8555-555555555555',
    baseUrl: 'https://www.landal.nl/parken/strand-resort-ouddorp-duin',
    trackingTemplate: null,
    status: 'placeholder',
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: '14141414-1414-4141-8141-141414141414',
    parkId: '66666666-6666-4666-8666-666666666666',
    baseUrl: 'https://www.landal.nl/parken/hoog-vaals',
    trackingTemplate: null,
    status: 'placeholder',
    createdAt,
    updatedAt: createdAt,
  },
]

export const mockCatalog: CatalogDataSet = {
  regions: mockRegions,
  facilities: mockFacilities,
  parks: mockParks,
  parkFacilities: mockParkFacilities,
  priceSnapshots: mockPriceSnapshots,
  affiliateLinkTemplates: mockAffiliateLinkTemplates,
}
