import { XMLParser } from 'fast-xml-parser'
import type {
  TradeTrackerFeedImportResult,
  TradeTrackerFeedProduct,
  TradeTrackerFeedProductAdditional,
  TradeTrackerImportCredentials,
} from '../types/importPipeline'

export type TradeTrackerSoapFetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>

const tradeTrackerSoapEndpoint = 'http://ws.tradetracker.com/soap/affiliate'
const tradeTrackerSoapNamespace = 'http://ws.tradetracker.com/soap/affiliate'
const soapEncodingStyle = 'http://schemas.xmlsoap.org/soap/encoding/'
const defaultFeedProductLimit = 100
const defaultFeedProductOffset = 0

const parser = new XMLParser({
  ignoreAttributes: false,
  parseTagValue: false,
  removeNSPrefix: true,
  trimValues: true,
})

interface SoapResponse {
  body: string
  cookie: string | null
  ok: boolean
  status: number
}

const escapeXml = (value: string): string => {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && Array.isArray(value) === false
}

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (isRecord(value) === false) {
    return null
  }

  return value
}

const asArray = (value: unknown): unknown[] => {
  if (value === undefined || value === null) {
    return []
  }

  if (Array.isArray(value) === true) {
    return value
  }

  return [value]
}

const readNestedValue = (value: unknown, path: string[]): unknown => {
  let currentValue: unknown = value

  for (const pathPart of path) {
    const currentRecord: Record<string, unknown> | null = asRecord(currentValue)

    if (currentRecord === null) {
      return undefined
    }

    currentValue = currentRecord[pathPart]
  }

  return currentValue
}

const readTextValue = (value: unknown): string | null => {
  if (value === undefined || value === null) {
    return null
  }

  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  const valueRecord: Record<string, unknown> | null = asRecord(value)

  if (valueRecord === null) {
    return null
  }

  return readTextValue(valueRecord['#text'])
}

const readRequiredText = (value: unknown): string => {
  const textValue: string | null = readTextValue(value)

  if (textValue === null) {
    return ''
  }

  return textValue
}

const readNullableText = (value: unknown): string | null => {
  const textValue: string = readRequiredText(value)

  if (textValue.length === 0) {
    return null
  }

  return textValue
}

const readNumber = (value: unknown): number => {
  const textValue: string | null = readTextValue(value)

  if (textValue === null) {
    return 0
  }

  const numericValue: number = Number(textValue)

  if (Number.isFinite(numericValue) === false) {
    return 0
  }

  return numericValue
}

const parseAdditionalItems = (additionalValue: unknown): TradeTrackerFeedProductAdditional[] => {
  const additionalItems: unknown[] = asArray(readNestedValue(additionalValue, ['item']))

  return additionalItems
    .map((additionalItem: unknown): TradeTrackerFeedProductAdditional | null => {
      const additionalRecord: Record<string, unknown> | null = asRecord(additionalItem)

      if (additionalRecord === null) {
        return null
      }

      const name: string = readRequiredText(additionalRecord.name)
      const value: string = readRequiredText(additionalRecord.value)

      if (name.length === 0) {
        return null
      }

      return {
        name,
        value,
      }
    })
    .filter((additionalItem: TradeTrackerFeedProductAdditional | null): additionalItem is TradeTrackerFeedProductAdditional => {
      return additionalItem !== null
    })
}

const parseFeedProductItem = (item: unknown): TradeTrackerFeedProduct | null => {
  const itemRecord: Record<string, unknown> | null = asRecord(item)

  if (itemRecord === null) {
    return null
  }

  const identifier: string = readRequiredText(itemRecord.identifier)
  const name: string = readRequiredText(itemRecord.name)
  const productUrl: string = readRequiredText(itemRecord.productURL)

  if (identifier.length === 0 || name.length === 0 || productUrl.length === 0) {
    return null
  }

  return {
    additional: parseAdditionalItems(itemRecord.additional),
    description: readNullableText(itemRecord.description),
    identifier,
    imageUrl: readNullableText(itemRecord.imageURL),
    name,
    priceAmount: readNumber(itemRecord.price),
    productCategoryName: readNullableText(itemRecord.productCategoryName),
    productUrl,
  }
}

export const parseTradeTrackerFeedProducts = (xml: string): TradeTrackerFeedProduct[] => {
  const parsedXml: unknown = parser.parse(xml)
  const productPaths: string[][] = [
    ['Envelope', 'Body', 'getFeedProductsResponse', 'feedProducts', 'item'],
    ['Envelope', 'Body', 'getFeedProductsResponse', 'return', 'item'],
    ['Envelope', 'Body', 'getFeedProductsResponse', 'feedProducts'],
  ]

  for (const productPath of productPaths) {
    const productItems: unknown[] = asArray(readNestedValue(parsedXml, productPath))

    if (productItems.length > 0) {
      return productItems
        .map((productItem: unknown): TradeTrackerFeedProduct | null => parseFeedProductItem(productItem))
        .filter((product: TradeTrackerFeedProduct | null): product is TradeTrackerFeedProduct => {
          return product !== null
        })
    }
  }

  return []
}

const createSoapEnvelope = (operationName: string, body: string): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="${tradeTrackerSoapNamespace}" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" SOAP-ENV:encodingStyle="${soapEncodingStyle}">
  <SOAP-ENV:Body>
    <ns1:${operationName}>
${body}
    </ns1:${operationName}>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`
}

const createTextElement = (name: string, value: string): string => {
  return `      <${name} xsi:type="xsd:string">${escapeXml(value)}</${name}>`
}

const createNumberElement = (name: string, value: string | number): string => {
  return `      <${name} xsi:type="xsd:nonNegativeInteger">${escapeXml(String(value))}</${name}>`
}

const createBooleanElement = (name: string, value: boolean): string => {
  return `      <${name} xsi:type="xsd:boolean">${value}</${name}>`
}

const createAuthenticateEnvelope = (credentials: TradeTrackerImportCredentials): string => {
  return createSoapEnvelope('authenticate', [
    createNumberElement('customerID', credentials.customerId),
    createTextElement('passphrase', credentials.accessKey),
    createBooleanElement('sandbox', false),
    createTextElement('locale', 'nl_NL'),
    createBooleanElement('demo', false),
  ].join('\n'))
}

const createFeedProductsEnvelope = (credentials: TradeTrackerImportCredentials): string => {
  const optionsBody: string = [
    createNumberElement('campaignID', credentials.campaignId),
    createNumberElement('limit', defaultFeedProductLimit),
    createNumberElement('offset', defaultFeedProductOffset),
  ].join('\n')

  return createSoapEnvelope('getFeedProducts', [
    createNumberElement('affiliateSiteID', credentials.affiliateSiteId),
    '      <options xsi:type="ns1:FeedProductFilter">',
    optionsBody,
    '      </options>',
  ].join('\n'))
}

const getResponseCookie = (headers: Headers): string | null => {
  const setCookieHeader: string | null = headers.get('set-cookie')

  if (setCookieHeader === null) {
    return null
  }

  const cookieValue: string | undefined = setCookieHeader.split(';').at(0)

  if (cookieValue === undefined || cookieValue.length === 0) {
    return null
  }

  return cookieValue
}

const postSoapRequest = async (fetcher: TradeTrackerSoapFetcher, operationName: string, body: string, cookie: string | null): Promise<SoapResponse> => {
  const headers = new Headers()

  headers.set('content-type', 'text/xml; charset=utf-8')
  headers.set('soapaction', `${tradeTrackerSoapNamespace}/${operationName}`)

  if (cookie !== null) {
    headers.set('cookie', cookie)
  }

  const response: Response = await fetcher(tradeTrackerSoapEndpoint, {
    body,
    headers,
    method: 'POST',
  })
  const responseBody: string = await response.text()

  return {
    body: responseBody,
    cookie: getResponseCookie(response.headers),
    ok: response.ok,
    status: response.status,
  }
}

export const fetchTradeTrackerFeedProducts = async (
  credentials: TradeTrackerImportCredentials,
  fetcher: TradeTrackerSoapFetcher = fetch,
): Promise<TradeTrackerFeedImportResult> => {
  const authenticateResponse: SoapResponse = await postSoapRequest(fetcher, 'authenticate', createAuthenticateEnvelope(credentials), null)

  if (authenticateResponse.ok === false) {
    throw new Error(`TradeTracker authenticatie faalde met status ${authenticateResponse.status}.`)
  }

  if (authenticateResponse.cookie === null) {
    throw new Error('TradeTracker authenticatie leverde geen sessie-cookie op.')
  }

  const feedProductsResponse: SoapResponse = await postSoapRequest(
    fetcher,
    'getFeedProducts',
    createFeedProductsEnvelope(credentials),
    authenticateResponse.cookie,
  )

  if (feedProductsResponse.ok === false) {
    throw new Error(`TradeTracker feed ophalen faalde met status ${feedProductsResponse.status}.`)
  }

  const products: TradeTrackerFeedProduct[] = parseTradeTrackerFeedProducts(feedProductsResponse.body)

  return {
    products,
    recordsImported: products.length,
  }
}
