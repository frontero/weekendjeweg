import type {
  AccommodationCardViewModel,
  AccommodationFilterOption,
  AccommodationFilterState,
  AccommodationSortMode,
} from '../types/accommodation'

const allFilterValue = 'all'
const maxPriceThresholds: number[] = [400, 500, 600, 750, 1000]

export const defaultAccommodationFilterState: AccommodationFilterState = {
  personCount: allFilterValue,
  numberOfNights: allFilterValue,
  maxPriceAmount: allFilterValue,
  sortMode: 'price-asc',
}

export const accommodationSortOptions: AccommodationFilterOption[] = [
  {
    value: 'price-asc',
    label: 'Prijs laag naar hoog',
  },
  {
    value: 'price-desc',
    label: 'Prijs hoog naar laag',
  },
  {
    value: 'capacity-asc',
    label: 'Personen laag naar hoog',
  },
  {
    value: 'capacity-desc',
    label: 'Personen hoog naar laag',
  },
]

const createAllOption = (label: string): AccommodationFilterOption => {
  return {
    value: allFilterValue,
    label,
  }
}

const parseNumericFilterValue = (value: string): number | null => {
  if (value === allFilterValue) {
    return null
  }

  const parsedValue: number = Number(value)

  if (Number.isFinite(parsedValue) === false) {
    return null
  }

  return parsedValue
}

const getUniqueSortedNumbers = (
  cards: AccommodationCardViewModel[],
  selector: (card: AccommodationCardViewModel) => number | null,
): number[] => {
  const values: number[] = cards
    .map((card: AccommodationCardViewModel): number | null => selector(card))
    .filter((value: number | null): value is number => value !== null)

  return [...new Set(values)].sort((leftValue: number, rightValue: number): number => leftValue - rightValue)
}

const createNightLabel = (numberOfNights: number): string => {
  if (numberOfNights === 1) {
    return '1 nacht'
  }

  return `${numberOfNights} nachten`
}

const createMaxPriceLabel = (priceAmount: number): string => {
  return `Tot € ${priceAmount}`
}

export const createPersonCountOptions = (cards: AccommodationCardViewModel[]): AccommodationFilterOption[] => {
  const options: AccommodationFilterOption[] = getUniqueSortedNumbers(
    cards,
    (card: AccommodationCardViewModel): number | null => card.accommodation.personCount,
  ).map((personCount: number): AccommodationFilterOption => {
    return {
      value: String(personCount),
      label: `${personCount}+ personen`,
    }
  })

  return [createAllOption('Alle gezelschappen'), ...options]
}

export const createNightOptions = (cards: AccommodationCardViewModel[]): AccommodationFilterOption[] => {
  const options: AccommodationFilterOption[] = getUniqueSortedNumbers(
    cards,
    (card: AccommodationCardViewModel): number | null => card.accommodation.numberOfNights,
  ).map((numberOfNights: number): AccommodationFilterOption => {
    return {
      value: String(numberOfNights),
      label: createNightLabel(numberOfNights),
    }
  })

  return [createAllOption('Alle verblijfsduren'), ...options]
}

export const createMaxPriceOptions = (cards: AccommodationCardViewModel[]): AccommodationFilterOption[] => {
  const prices: number[] = getUniqueSortedNumbers(
    cards,
    (card: AccommodationCardViewModel): number | null => card.accommodation.priceAmount,
  )
  const options: AccommodationFilterOption[] = maxPriceThresholds
    .filter((threshold: number): boolean => prices.some((price: number): boolean => price <= threshold) === true)
    .map((threshold: number): AccommodationFilterOption => {
      return {
        value: String(threshold),
        label: createMaxPriceLabel(threshold),
      }
    })

  return [createAllOption('Elke prijs'), ...options]
}

const matchesPersonCount = (card: AccommodationCardViewModel, personCountFilter: string): boolean => {
  const selectedPersonCount: number | null = parseNumericFilterValue(personCountFilter)

  if (selectedPersonCount === null) {
    return true
  }

  if (card.accommodation.personCount === null) {
    return false
  }

  return card.accommodation.personCount >= selectedPersonCount
}

const matchesNumberOfNights = (card: AccommodationCardViewModel, nightsFilter: string): boolean => {
  const selectedNumberOfNights: number | null = parseNumericFilterValue(nightsFilter)

  if (selectedNumberOfNights === null) {
    return true
  }

  return card.accommodation.numberOfNights === selectedNumberOfNights
}

const matchesMaxPriceAmount = (card: AccommodationCardViewModel, maxPriceFilter: string): boolean => {
  const selectedMaxPriceAmount: number | null = parseNumericFilterValue(maxPriceFilter)

  if (selectedMaxPriceAmount === null) {
    return true
  }

  if (card.accommodation.priceAmount === null) {
    return false
  }

  return card.accommodation.priceAmount <= selectedMaxPriceAmount
}

const getSortablePrice = (card: AccommodationCardViewModel): number => {
  return card.accommodation.priceAmount ?? Number.MAX_SAFE_INTEGER
}

const getSortableCapacity = (card: AccommodationCardViewModel): number => {
  return card.accommodation.personCount ?? Number.MAX_SAFE_INTEGER
}

const compareByCode = (leftCard: AccommodationCardViewModel, rightCard: AccommodationCardViewModel): number => {
  return leftCard.accommodation.code.localeCompare(rightCard.accommodation.code, 'nl')
}

const compareByPriceAscending = (leftCard: AccommodationCardViewModel, rightCard: AccommodationCardViewModel): number => {
  const priceDifference: number = getSortablePrice(leftCard) - getSortablePrice(rightCard)

  if (priceDifference !== 0) {
    return priceDifference
  }

  return compareByCode(leftCard, rightCard)
}

const compareByPriceDescending = (leftCard: AccommodationCardViewModel, rightCard: AccommodationCardViewModel): number => {
  const leftPrice: number | null = leftCard.accommodation.priceAmount
  const rightPrice: number | null = rightCard.accommodation.priceAmount

  if (leftPrice === null && rightPrice === null) {
    return compareByCode(leftCard, rightCard)
  }

  if (leftPrice === null) {
    return 1
  }

  if (rightPrice === null) {
    return -1
  }

  const priceDifference: number = rightPrice - leftPrice

  if (priceDifference !== 0) {
    return priceDifference
  }

  return compareByCode(leftCard, rightCard)
}

const compareByCapacityAscending = (leftCard: AccommodationCardViewModel, rightCard: AccommodationCardViewModel): number => {
  const capacityDifference: number = getSortableCapacity(leftCard) - getSortableCapacity(rightCard)

  if (capacityDifference !== 0) {
    return capacityDifference
  }

  return compareByPriceAscending(leftCard, rightCard)
}

export const sortAccommodationCards = (
  cards: AccommodationCardViewModel[],
  sortMode: AccommodationSortMode,
): AccommodationCardViewModel[] => {
  if (sortMode === 'price-desc') {
    return [...cards].sort(compareByPriceDescending)
  }

  if (sortMode === 'capacity-asc') {
    return [...cards].sort(compareByCapacityAscending)
  }

  if (sortMode === 'capacity-desc') {
    return [...cards].sort((leftCard: AccommodationCardViewModel, rightCard: AccommodationCardViewModel): number => {
      return compareByCapacityAscending(rightCard, leftCard)
    })
  }

  return [...cards].sort(compareByPriceAscending)
}

export const filterAccommodationCards = (
  cards: AccommodationCardViewModel[],
  filters: AccommodationFilterState,
): AccommodationCardViewModel[] => {
  const filteredCards: AccommodationCardViewModel[] = cards.filter((card: AccommodationCardViewModel): boolean => {
    return matchesPersonCount(card, filters.personCount) === true
      && matchesNumberOfNights(card, filters.numberOfNights) === true
      && matchesMaxPriceAmount(card, filters.maxPriceAmount) === true
  })

  return sortAccommodationCards(filteredCards, filters.sortMode)
}
