import { Server as ServerIO } from 'socket.io'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!(res.socket as any).server.io) {
    console.log('*First use, starting socket.io')

    const io = new ServerIO((res.socket as any).server, {
      path: '/api/socketio',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    })

    io.on('connection', (socket) => {
      console.log('New client connected')

      // Send a welcome message
      socket.emit('log', JSON.stringify({ message: 'Connected to log stream', timestamp: new Date().toISOString() }))

      // Simulate log messages (remove this in production)
      const interval = setInterval(() => {
        const logMessage = `Log entry at ${new Date().toISOString()}`
        io.emit('log', JSON.stringify({ message: logMessage, timestamp: new Date().toISOString() }))
      }, 5000)

      socket.on('disconnect', () => {
        console.log('Client disconnected')
        clearInterval(interval)
      })

      socket.on('error', (error) => {
        console.error('Socket error:', error)
        socket.emit('log', JSON.stringify({ message: `Error: ${error.message}`, timestamp: new Date().toISOString() }))
      })
    })

    ;(res.socket as any).server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export default ioHandler

