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
const deVersScrapedAt = '2026-05-20T08:40:05.000Z'
const tradeTrackerLandalBaseUrl = 'https://tc.tradetracker.net/?c=20132&m=12&a=302167'
const tradeTrackerLandalTrackingTemplate = 'r=weekendjeweg-{parkSlug}&u={landalPath}'

const regionVeluweId = '11111111-1111-4111-8111-111111111111'
const regionKustId = '22222222-2222-4222-8222-222222222222'
const regionLimburgId = '33333333-3333-4333-8333-333333333333'
const regionNoordBrabantId = '77777777-7777-4777-8777-777777777770'
const facilityZwembadId = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
const facilityWellnessId = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'
const facilityHondWelkomId = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc'
const parkMiggelenbergId = '44444444-4444-4444-8444-444444444444'
const parkOuddorpDuinId = '55555555-5555-4555-8555-555555555555'
const parkHoogVaalsId = '66666666-6666-4666-8666-666666666666'
const parkDeVersId = '77777777-7777-4777-8777-777777777771'

export const mockRegions: RegionRecord[] = [
  {
    id: regionVeluweId,
    slug: 'veluwe',
    name: 'Veluwe',
    countryCode: 'NL',
    seoTitle: 'Landal-parken op de Veluwe',
    seoDescription: 'Vergelijk Landal-parken op de Veluwe voor een weekendje weg.',
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: regionKustId,
    slug: 'kust',
    name: 'Kust',
    countryCode: 'NL',
    seoTitle: 'Landal-parken aan de kust',
    seoDescription: 'Vergelijk Landal-parken aan de Nederlandse kust.',
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: regionLimburgId,
    slug: 'limburg',
    name: 'Limburg',
    countryCode: 'NL',
    seoTitle: 'Landal-parken in Limburg',
    seoDescription: 'Vergelijk Landal-parken in Limburg voor een korte vakantie.',
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: regionNoordBrabantId,
    slug: 'noord-brabant',
    name: 'Noord-Brabant',
    countryCode: 'NL',
    seoTitle: 'Landal-parken in Noord-Brabant',
    seoDescription: 'Vergelijk Landal-parken in Noord-Brabant met prijsvoorbeelden.',
    createdAt,
    updatedAt: deVersScrapedAt,
  },
]

export const mockFacilities: FacilityRecord[] = [
  {
    id: facilityZwembadId,
    slug: 'zwembad',
    name: 'Zwembad',
    sourceKey: 'pool',
  },
  {
    id: facilityWellnessId,
    slug: 'wellness',
    name: 'Wellness',
    sourceKey: 'wellness',
  },
  {
    id: facilityHondWelkomId,
    slug: 'hond-welkom',
    name: 'Hond welkom',
    sourceKey: 'pets_allowed',
  },
]

export const mockParks: ParkRecord[] = [
  {
    id: parkMiggelenbergId,
    slug: 'landal-miggelenberg',
    name: 'Landal Miggelenberg',
    locationName: 'Hoenderloo',
    regionId: regionVeluweId,
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
    id: parkOuddorpDuinId,
    slug: 'landal-strand-resort-ouddorp-duin',
    name: 'Landal Strand Resort Ouddorp Duin',
    locationName: 'Ouddorp',
    regionId: regionKustId,
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
    id: parkHoogVaalsId,
    slug: 'landal-hoog-vaals',
    name: 'Landal Hoog Vaals',
    locationName: 'Vaals',
    regionId: regionLimburgId,
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
  {
    id: parkDeVersId,
    slug: 'landal-de-vers',
    name: 'Landal De Vers',
    locationName: 'Overloon',
    regionId: regionNoordBrabantId,
    countryCode: 'NL',
    description: 'Groen park in Overloon tussen de bossen met fietsroutes, speelplezier en ontspanning in Noord-Brabant.',
    highlights: ['Bosrijke ligging', 'Fietsroutes dichtbij', 'Speelplezier op het park'],
    visualPlaceholderKey: 'forest',
    sourceUrl: 'https://www.landal.nl/parken/de-vers',
    landalParkCode: 'VES',
    lastImportedAt: deVersScrapedAt,
    createdAt,
    updatedAt: deVersScrapedAt,
  },
]

export const mockParkFacilities: ParkFacilityRecord[] = [
  {
    parkId: parkMiggelenbergId,
    facilityId: facilityZwembadId,
  },
  {
    parkId: parkMiggelenbergId,
    facilityId: facilityHondWelkomId,
  },
  {
    parkId: parkOuddorpDuinId,
    facilityId: facilityHondWelkomId,
  },
  {
    parkId: parkHoogVaalsId,
    facilityId: facilityZwembadId,
  },
  {
    parkId: parkHoogVaalsId,
    facilityId: facilityWellnessId,
  },
  {
    parkId: parkDeVersId,
    facilityId: facilityZwembadId,
  },
  {
    parkId: parkDeVersId,
    facilityId: facilityHondWelkomId,
  },
]

export const mockPriceSnapshots: PriceSnapshotRecord[] = [
  {
    id: '77777777-7777-4777-8777-777777777777',
    parkId: parkMiggelenbergId,
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
    parkId: parkOuddorpDuinId,
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
    parkId: parkHoogVaalsId,
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
  {
    id: '77777777-7777-4777-8777-777777777772',
    parkId: parkDeVersId,
    arrivalDate: '2026-06-05',
    departureDate: '2026-06-08',
    adultCount: 2,
    childCount: 0,
    currency: 'EUR',
    priceAmount: 416,
    priceLabel: 'Landal prijsvoorbeeld',
    sourceCapturedAt: deVersScrapedAt,
    expiresAt: '2026-05-21T08:40:05.000Z',
    createdAt: deVersScrapedAt,
  },
]

export const mockAffiliateLinkTemplates: AffiliateLinkTemplateRecord[] = [
  {
    id: '12121212-1212-4121-8121-121212121212',
    parkId: parkMiggelenbergId,
    baseUrl: tradeTrackerLandalBaseUrl,
    trackingTemplate: tradeTrackerLandalTrackingTemplate,
    status: 'placeholder',
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: '13131313-1313-4131-8131-131313131313',
    parkId: parkOuddorpDuinId,
    baseUrl: tradeTrackerLandalBaseUrl,
    trackingTemplate: tradeTrackerLandalTrackingTemplate,
    status: 'placeholder',
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: '14141414-1414-4141-8141-141414141414',
    parkId: parkHoogVaalsId,
    baseUrl: tradeTrackerLandalBaseUrl,
    trackingTemplate: tradeTrackerLandalTrackingTemplate,
    status: 'placeholder',
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: '15151515-1515-4151-8151-151515151515',
    parkId: parkDeVersId,
    baseUrl: tradeTrackerLandalBaseUrl,
    trackingTemplate: tradeTrackerLandalTrackingTemplate,
    status: 'placeholder',
    createdAt: deVersScrapedAt,
    updatedAt: deVersScrapedAt,
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
