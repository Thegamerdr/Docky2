const cache: { [key: string]: { data: any; timestamp: number } } = {}

export function setCache(key: string, data: any, expirationInMinutes: number = 5) {
  cache[key] = {
    data,
    timestamp: Date.now() + expirationInMinutes * 60 * 1000,
  }
}

export function getCache(key: string) {
  const cachedItem = cache[key]
  if (cachedItem && cachedItem.timestamp > Date.now()) {
    return cachedItem.data
  }
  return null
}

