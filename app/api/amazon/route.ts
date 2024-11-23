import { NextResponse } from 'next/server'
import crypto from 'crypto'

const AMAZON_ACCESS_KEY = process.env.AMAZON_ACCESS_KEY
const AMAZON_SECRET_KEY = process.env.AMAZON_SECRET_KEY
const AMAZON_PARTNER_TAG = process.env.AMAZON_PARTNER_TAG
const AMAZON_HOST = 'webservices.amazon.com'
const AMAZON_REGION = 'us-east-1'
const AMAZON_URI = '/paapi5/searchitems'

function generateSignature(stringToSign: string, secretKey: string) {
  return crypto.createHmac('sha256', secretKey).update(stringToSign).digest('base64')
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keywords = searchParams.get('keywords')

  if (!keywords) {
    return NextResponse.json({ error: 'Keywords are required' }, { status: 400 })
  }

  const timestamp = new Date().toISOString()
  const payload = JSON.stringify({
    Keywords: keywords,
    Resources: ['ItemInfo.Title', 'Offers.Listings.Price', 'Images.Primary.Medium'],
    PartnerTag: AMAZON_PARTNER_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.com',
  })

  const headers = {
    'content-encoding': 'amz-1.0',
    'content-type': 'application/json; charset=utf-8',
    'host': AMAZON_HOST,
    'x-amz-date': timestamp,
    'x-amz-target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems',
  }

  const canonicalHeaders = Object.entries(headers)
    .map(([key, value]) => `${key.toLowerCase()}:${value}\n`)
    .join('')

  const signedHeaders = Object.keys(headers)
    .map(key => key.toLowerCase())
    .sort()
    .join(';')

  const canonicalRequest = [
    'POST',
    AMAZON_URI,
    '',
    canonicalHeaders,
    signedHeaders,
    crypto.createHash('sha256').update(payload).digest('hex'),
  ].join('\n')

  const stringToSign = [
    'AWS4-HMAC-SHA256',
    timestamp,
    `${timestamp.substr(0, 8)}/${AMAZON_REGION}/ProductAdvertisingAPI/aws4_request`,
    crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
  ].join('\n')

  const signature = generateSignature(stringToSign, `AWS4${AMAZON_SECRET_KEY}`)

  const authorizationHeader = [
    `AWS4-HMAC-SHA256 Credential=${AMAZON_ACCESS_KEY}/${timestamp.substr(0, 8)}/${AMAZON_REGION}/ProductAdvertisingAPI/aws4_request`,
    `SignedHeaders=${signedHeaders}`,
    `Signature=${signature}`,
  ].join(', ')

  try {
    const response = await fetch(`https://${AMAZON_HOST}${AMAZON_URI}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Authorization': authorizationHeader,
      },
      body: payload,
    })

    if (!response.ok) {
      throw new Error(`Amazon API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching from Amazon API:', error)
    return NextResponse.json({ error: 'Failed to fetch data from Amazon' }, { status: 500 })
  }
}

