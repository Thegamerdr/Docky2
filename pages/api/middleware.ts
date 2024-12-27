import { NextApiRequest, NextApiResponse } from 'next'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'

const applyMiddleware = (middleware) => (request, response) =>
  new Promise((resolve, reject) => {
    middleware(request, response, (result) =>
      result instanceof Error ? reject(result) : resolve(result)
    )
  })

const getIP = (request) =>
  request.ip ||
  request.headers['x-forwarded-for'] ||
  request.socket.remoteAddress

export const rateLimiter = rateLimit({
  keyGenerator: getIP,
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
})

export const speedLimiter = slowDown({
  keyGenerator: getIP,
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // Allow 50 requests per 15 minutes, then...
  delayMs: 500 // Begin adding 500ms of delay per request above 100
})

async function middleware(request: NextApiRequest, response: NextApiResponse) {
  await applyMiddleware(rateLimiter)(request, response)
  await applyMiddleware(speedLimiter)(request, response)
}

export default middleware

