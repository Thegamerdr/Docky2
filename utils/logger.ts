type LogLevel = 'info' | 'warn' | 'error'

export const logger = {
  log: (message: string, level: LogLevel = 'info', extra?: unknown) => {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`
    
    switch (level) {
      case 'info':
        console.log(logMessage, extra)
        break
      case 'warn':
        console.warn(logMessage, extra)
        break
      case 'error':
        console.error(logMessage, extra)
        // Here you could send the error to an error tracking service
        break
    }
  },
  info: (message: string, extra?: unknown) => logger.log(message, 'info', extra),
  warn: (message: string, extra?: unknown) => logger.log(message, 'warn', extra),
  error: (message: string, extra?: unknown) => {
    if (extra instanceof Error) {
      logger.log(message, 'error', { message: extra.message, stack: extra.stack })
    } else {
      logger.log(message, 'error', extra)
    }
  },
}

